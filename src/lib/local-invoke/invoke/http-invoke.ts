'use strict';

import watch from 'node-watch';

import { ServiceConfig } from '../../interface/fc-service';
import { FunctionConfig } from '../../interface/fc-function';
import { TriggerConfig } from '../../interface/fc-trigger';
import * as rimraf from 'rimraf';
import { isIgnored as ignore } from '../ignore';
import Invoke from './invoke';
import * as docker from '../../docker/docker';
import * as dockerOpts from '../../docker/docker-opts';
import Docker from 'dockerode';
import Container from 'dockerode';
import { isCustomContainerRuntime } from '../../utils/runtime';
import logger from '../../../common/logger';
import { ICredentials } from '../../../common/entity';
import { genProxyContainerName } from '../../definition';
import { sleep } from '../../utils/time';
import { setSigint } from '../../utils/process';
import { setKVInState } from '../../utils/devs';
import _ from 'lodash';
import { promiseRetry } from '../../retry';
import * as core from '@serverless-devs/core';
import StdoutFormatter from '../../component/stdout-formatter';
import TunnelService from '../../tunnel-service';
import { genStateId, getInvokeContainerIdFromState, unsetInvokeContainerId } from '../../utils/state';
import devnull from 'dev-null';
import { convertNasConfigToMountCmd } from '../nas';
import { isContinueWhenNasMountError } from '../../prompt';

const dockerClient: any = new Docker();

export default class HttpInvoke extends Invoke {
  private runner: any;
  private watcher?: any;

  constructor(
    tunnelService: TunnelService,
    sessionId: string,
    creds: ICredentials,
    region: string,
    baseDir: string,
    serviceConfig: ServiceConfig,
    functionConfig: FunctionConfig,
    triggerConfig?: TriggerConfig,
    debugPort?: number,
    debugIde?: any,
    tmpDir?: string,
    debuggerPath?: any,
    debugArgs?: any,
    nasBaseDir?: string,
  ) {
    super(
      tunnelService,
      sessionId,
      creds,
      region,
      baseDir,
      serviceConfig,
      functionConfig,
      triggerConfig,
      debugPort,
      debugIde,
      tmpDir,
      debuggerPath,
      debugArgs,
      nasBaseDir,
    );
    setSigint();
    // exit container, when use ctrl + c
    process.on('SIGINT', async () => {
      await this.cancelExecAndCleanAll();
    });
  }

  async _disableRunner(evt, name) {
    if (!this.runner) {
      return;
    }

    logger.info(`Detect code changes, file is ${name}, event is ${evt}, auto reloading...`);
    const oldRunner = this.runner;
    let tmpCodeDir = this.unzippedCodeDir;
    this.runner = null;
    // this.containerName = docker.generateRamdomContainerName();
    await this.init();
    await sleep(500);
    const stopVm = core.spinner('Reloading success, stopping old function container...');
    try {
      await oldRunner.stop();
      stopVm.succeed('Stop old function container successfully');
    } catch (e) {
      stopVm.fail(`Stop function container failed.`);
      logger.debug(`Stop function container failed, error: ${e}`);
      const killVm = core.spinner('Killing old container...');
      try {
        await oldRunner.kill();
        killVm.succeed('Kill old container successfully');
      } catch (e) {
        killVm.fail('Kill old container failed, please kill it manually.');
        logger.debug(`Kill function container failed, error: ${e}`);
      }
    }

    await unsetInvokeContainerId(this.creds?.AccountID, this.region, this.serviceName, this.functionName);
    if (tmpCodeDir) {
      rimraf.sync(tmpCodeDir);
      logger.info(`Clean tmp code dir ${tmpCodeDir} successfully.\n`);
    }
  }

  async _startRunner(): Promise<void> {
    // 检查代理容器是否存在，若不存在则 ca 启动失败
    if (this.tunnelService && !(await this.tunnelService.checkIfProxyContainerRunning())) {
      console.log();
      logger.error('\nFunction container starts failed.Start cleaning now.');
      if (this.tunnelService) {
        await this.tunnelService.clean();
      }
      throw new Error("Function container starts failed because proxy container is not running, please retry 'setup' method.");
    }
    const envs = await docker.generateDockerEnvs(
      this.creds,
      this.region,
      this.baseDir,
      this.serviceName,
      this.serviceConfig,
      this.functionName,
      this.functionConfig,
      this.debugPort,
      null,
      this.nasConfig,
      this.debugIde,
      this.debugArgs,
    );
    const cmd = docker.generateDockerCmd(this.runtime, true, this.functionConfig);
    const proxyContainerName: string = genProxyContainerName(this.sessionId);
    this.containerName = docker.generateRamdomContainerName();
    const containerResourceLimit = docker.generateResourcesLimitOptions(this.functionConfig);    
    const opts = await dockerOpts.generateLocalStartOpts(
      proxyContainerName,
      this.runtime,
      this.containerName,
      this.mounts,
      cmd,
      envs,
      containerResourceLimit,
      {
        debugPort: this.debugPort,
        dockerUser: this.dockerUser,
        imageName: this.imageName,
      },
    );
    this.runner = await docker.startContainer(opts, process.stdout, process.stderr, {
      serviceName: this.serviceName,
      functionName: this.functionName,
    });
    await this.saveInvokeContainerId();
    const isDebug: boolean = process.env?.temp_params?.includes('--debug');
    // check if server is up
    if (!isCustomContainerRuntime(this.functionConfig?.runtime)) {
      logger.info(StdoutFormatter.stdoutFormatter.check('server in function container', 'is up.'));
      await promiseRetry(async (retry: any, times: number): Promise<any> => {
        try {
          if (!this.runner) {
            throw new Error('Function container is closed, exit!');
          }
          await sleep(1000);
          const caPort: number = this.functionConfig?.caPort || 9000;
          const res: any = await this.runner.exec(['curl', `127.0.0.1:${caPort}`], {
            outputStream: isDebug ? process.stdout : devnull(),
            errorStream: isDebug ? process.stderr : devnull(),
          });
          if (res === 0) {
            logger.info(`Server in function container is up!`);
            return;
          }
          logger.debug(`Server is not up. Result is :${res}`);
          logger.info(StdoutFormatter.stdoutFormatter.retry('checking server in function container', 'is up', '', times));
          retry(res);
        } catch (ex) {
          if (ex.message === 'Function container is closed, exit!') {
            throw ex;
          }
          logger.debug(`Checking server in function container failed, error: ${ex}`);
          logger.info(StdoutFormatter.stdoutFormatter.retry('checking server in function container', 'is up', '', times));
          retry(ex);
        }
      }, 20);
    }

    const nasCmds: [] = convertNasConfigToMountCmd(this.nasConfig);

    if (!_.isEmpty(nasCmds)) {
      logger.info('Attempting to mount nas...');
      const nasMountTasks: any = nasCmds.map((nasCmd) => {
        return new Promise(async (resolve, reject) => {
          try {
            const mountRes: any = await this.runner.exec(nasCmd);
            resolve(mountRes);
          } catch (error) {
            logger.debug(`Mount failed, command is : ${nasCmd}, result is: ${error}`);
            reject(error);
          }
        });
      });

      await promiseRetry(async (retry: any, times: number): Promise<any> => {
        await Promise.all(nasMountTasks)
          .then((allNasMountRes) => {
            logger.debug(`Nas mount results: ${allNasMountRes}`);
            logger.info('NAS has been mounted successfully！');
            return true;
          })
          .catch((mountNasError) => {
            logger.info(StdoutFormatter.stdoutFormatter.retry('check the NAS', 'is mounted', '', times));
            retry(mountNasError);
          });
      })
        .then(() => {
          return;
        })
        .catch(async (err) => {
          logger.warning('Mount nas failed.');
          logger.debug(`Mount nas failed, error is ${err}`);
          logger.info(`Please confirm the following items in s.yaml:
- VPC has been configured correctly
- NAS has been configured correctly
- The NAS mount point is a private network type and is under the same VPC as the configuration
- The NAS source directory exists
For more information about s.yaml configuration, please refer to: https://github.com/devsapp/fc/blob/main/docs/Others/yaml.md`);

          const isContinue = await isContinueWhenNasMountError();
          if (!isContinue) {
            await this.cancelExecAndCleanAll();
          } else {
            logger.info('The container was started successfully in local mount nas mode!');
          }
        });
    }

    return;
  }

  private async saveInvokeContainerId(): Promise<void> {
    await setKVInState(
      'invokeContainerId',
      this.runner?.containerId,
      genStateId(this.creds?.AccountID, this.region, this.serviceName, this.functionName),
    );
  }

  async initWatch(): Promise<any> {
    if (!this.watcher && !isCustomContainerRuntime(this.runtime)) {
      // add file ignore when auto reloading
      const ign = await ignore(this.baseDir);
      // 为减缓文件持续更新导致容器不断启停的情况，需要设置 stopMutex/startMutex 标志位
      //   stopMutex: 停止容器锁，文件变化被检测到时若该标志位为真，则此次变化被丢弃，不进行后续处理。
      //   startMutex: 启动容器锁，文件变化被检测到时若该标志位为真，则等待直到该锁被释放，若在等待期间检测到 stopMutex 为真，则此次变化被丢弃。
      let stopMutex = false;
      let startMutex = false;
      this.watcher = watch(
        this.codeUri,
        {
          recursive: true,
          persistent: false,
          filter: (f) => {
            return ign && !ign(f);
          },
        },
        async (evt, name) => {
          if (stopMutex) {
            return;
          }
          // 最大启动容器锁占用时间：300s
          const maxStartMutexOccupiedTime: number = 300;
          let startMutexOccupiedTime: number = 0;
          if (startMutex) {
            // Wait for startMutex to be released
            while (startMutex) {
              // TODO: 设置等待时间上限
              if (stopMutex) {
                return;
              }
              await sleep(3000);
              startMutexOccupiedTime = startMutexOccupiedTime + 3;
              if (startMutexOccupiedTime > maxStartMutexOccupiedTime) {
                await this.clean();
                if (this.tunnelService) {
                  await this.tunnelService.clean();
                }
                throw new Error(
                  `Restart function container timeout after 300s!Please check if docker runs normally, then runs 'clean' method and try 'setup' again.`,
                );
              }
            }
          }
          stopMutex = true;
          try {
            if (this.runner) {
              await this._disableRunner(evt, name);
            } else {
              logger.debug('detect code changes, but no runner found, starting....');
            }
          } catch (e) {
            logger.warning(`Stop function container failed, please stop it manually.`);
            logger.debug(`Stop function container error: ${e}`);
          }

          startMutex = true;
          stopMutex = false;
          logger.info('Detecting code changes and Restarting funtion container...');
          await promiseRetry(async (retry: any, times: number): Promise<any> => {
            try {
              await this._startRunner();
              logger.info("Restart function container succeed! Please try 'invoke' again.");
              return;
            } catch (ex) {
              logger.error('Restart function container failed!');
              if (ex?.message.includes('Function container starts failed because proxy container is not running')) {
                throw ex;
              }

              logger.debug(`Restart function container failed, error is: \n${ex}`);
              logger.info(StdoutFormatter.stdoutFormatter.retry('function container', 'restart', '', times));
              await sleep(100);
              retry(ex);
            }
          });
          startMutex = false;
        },
      );
      this.watcher.on('error', (err) => {
        throw err;
      });
    }
  }

  async initAndStartRunner() {
    await this.init();
    await this._startRunner();
    await this.initWatch();
    await this.setDebugIdeConfig();
  }

  async clean(): Promise<void> {
    const invokeContainerId: string = await getInvokeContainerIdFromState(this.creds?.AccountID, this.region, this.serviceName, this.functionName);
    const container: Container = await dockerClient.getContainer(invokeContainerId);
    await docker.stopContainer(container);
    await unsetInvokeContainerId(this.creds?.AccountID, this.region, this.serviceName, this.functionName);
  }

  async cancelExecAndCleanAll(): Promise<void> {
    if (this.watcher) {
      this.watcher.close();
    }
    this.cleanUnzippedCodeDir();
    if (this.runner) {
      const stopVm = core.spinner('Received canncel request, stopping running function container...');
      try {
        await this.runner.stop();
        stopVm.succeed('Stop function container successfully');
      } catch (e) {
        stopVm.fail('Stop function container failed.');
        logger.debug(`Stop function container failed, error: ${e}`);
        const killVm = core.spinner('Killing old container...');
        try {
          await this.runner.kill();
          killVm.succeed('Kill function container successfully');
        } catch (e) {
          killVm.fail('Kill old container failed, please kill it manually.');
          logger.debug(`Kill function container failed, error: ${e}`);
        }
      }
      await unsetInvokeContainerId(this.creds?.AccountID, this.region, this.serviceName, this.functionName);
      this.runner = null;
    }
    if (this.tunnelService) {
      await this.tunnelService.clean();
    }
    // 修复 windows 环境下 Ctrl C 后容器退出，但是程序会 block 住的问题
    if (process.platform === 'win32') {
      process.exit(0);
    }
  }
}
