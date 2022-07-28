import logger from './common/logger';
import { InputProps, ICredentials } from './common/entity';
import * as core from '@serverless-devs/core';
import StdoutFormatter from './lib/component/stdout-formatter';
import { IProperties } from './lib/interface/fc-tunnel-invoke';
import { ServiceConfig } from './lib/interface/fc-service';
import { TriggerConfig } from './lib/interface/fc-trigger';
import { FunctionConfig } from './lib/interface/fc-function';
import { CustomDomainConfig } from './lib/interface/fc-custom-domain';
import path from 'path';
import { detectNasBaseDir, updateCodeUriWithBuildPath } from './lib/devs';
import TunnelService from './lib/tunnel-service';
import LocalInvoke from './lib/local-invoke/local-invoke';
import { validateCredentials } from './lib/validate';
import { getHttpTrigger, isAutoConfig } from './lib/definition';
import { getDebugOptions } from './lib/local-invoke/debug';
import { ensureTmpDir } from './lib/utils/path';
import { Session } from './lib/interface/session';
import { VpcConfig } from './lib/interface/vpc';
import { NasConfig } from './lib/interface/nas';
import { loadLayer } from './lib/layer';

const _ = core.lodash;

export default class FcTunnelInvokeComponent {
  static readonly supportedDebugIde: string[] = ['vscode', 'intellij'];
  static readonly supportedDebugRuntime: string [] = ['python', 'nodejs', 'java'];

  async handlerInputs(inputs: InputProps): Promise<{ [key: string]: any }> {
    await StdoutFormatter.initStdout();
    const project = inputs?.project;
    const access: string = project?.access;
    const creds: ICredentials = await core.getCredential(access);
    validateCredentials(creds);

    const properties: IProperties = inputs?.props;

    const appName: string = inputs?.appName;
    // 去除 args 的行首以及行尾的空格
    const args: string = inputs?.args.replace(/(^\s*)|(\s*$)/g, '');
    const curPath: any = inputs?.path;

    const devsPath: string = curPath?.configPath || process.cwd();
    const nasBaseDir: string = detectNasBaseDir(devsPath);
    const baseDir: string = path.dirname(devsPath);

    const projectName: string = project?.projectName;
    const { region } = properties;
    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
      boolean: ['help'],
      alias: { help: 'h' },
    });
    const argsData: any = parsedArgs?.data || {};
    if (argsData?.help) {
      return {
        region,
        creds,
        path,
        args,
        access,
        isHelp: true,
      };
    }

    const serviceConfig: ServiceConfig = properties?.service;
    const triggerConfigList: TriggerConfig[] = properties?.triggers.filter(({ qualifier }: any) => _.isEmpty(qualifier) || _.isEqual(_.toLower(qualifier), 'latest'));
    const customDomainConfigList: CustomDomainConfig[] = properties?.customDomains;
    const functionConfig: FunctionConfig = updateCodeUriWithBuildPath(baseDir, properties?.function, serviceConfig.name);

    await loadLayer({ // 加载 layer 的代码
      credentials: creds, region,
      baseDir,
      layers: functionConfig.layers,
      runtime: functionConfig.runtime,
      serviceName: serviceConfig.name,
      functionName: functionConfig.name,
    });

    return {
      serviceConfig,
      functionConfig,
      triggerConfigList,
      customDomainConfigList,
      region,
      creds,
      curPath,
      args,
      appName,
      projectName,
      devsPath,
      nasBaseDir,
      baseDir,
      access,
    };
  }

  /**
   * setup
   * @param inputs
   * @returns
   */
  public async setup(inputs: InputProps) {
    const {
      serviceConfig,
      functionConfig,
      triggerConfigList,
      customDomainConfigList,
      region,
      devsPath,
      nasBaseDir,
      baseDir,
      creds,
      isHelp,
      access,
      appName,
      curPath,
    } = await this.handlerInputs(inputs);

    if (isHelp) {
      // TODO: help info
      return;
    }
    // TODO: inputs validation
    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
      boolean: ['debug', 'assume-yes'],
      alias: {
        help: 'h',
        'debug-port': 'd',
        'assume-yes': 'y',
        config: 'c',
      },
    });
    const argsData: any = parsedArgs?.data || {};
    const assumeYes: boolean = argsData.y || argsData.assumeYes || argsData['assume-yes'];

    const { debugPort, debugIde, debuggerPath, debugArgs } = getDebugOptions(argsData);
    if (!FcTunnelInvokeComponent.supportedDebugRuntime.includes(functionConfig.runtime) && !_.isEmpty(debugPort)) {
      throw new core.CatchableError('End cloud intermodulation breakpoint debugging supports three languages: python, nodejs, java');
    }
    const memorySize: number = argsData['memory-size'];
    if (debugIde && !FcTunnelInvokeComponent.supportedDebugIde.includes(_.toLower(debugIde))) {
      logger.error(`Unsupported ide: ${debugIde} for debugging.Only ${FcTunnelInvokeComponent.supportedDebugIde} are supported`);
      return;
    }

    const vpcConfig: VpcConfig | string = serviceConfig.vpcConfig;
    const nasConfig: NasConfig | string = serviceConfig.nasConfig;

    // Judge the validity of vpc and nas configuration
    const isVpcAuto: boolean = isAutoConfig(serviceConfig.vpcConfig);

    if (!isVpcAuto && typeof vpcConfig === 'string') {
      logger.error(`Unsupported vpcConfig: ${vpcConfig} which should be 'auto' or 'Auto' when its type is string`);
      return;
    }
    if (typeof vpcConfig === 'undefined' && !isAutoConfig(nasConfig) && typeof nasConfig !== 'undefined') {
      logger.error(`Unsupported vpcConfig: vpcConfig can't be 'undefined' when nasConfig was not 'auto'`);
      return;
    }
    if (isVpcAuto && !isAutoConfig(nasConfig)) {
      logger.error(`Unsupported vpcConfig: vpcConfig can't be 'auto' or 'Auto' when nasConfig was not 'auto'`);
      return;
    }

    const tunnelService: TunnelService = new TunnelService(
      creds,
      serviceConfig,
      functionConfig,
      region,
      access,
      appName,
      curPath,
      triggerConfigList,
      customDomainConfigList,
      debugPort,
      debugIde,
      memorySize,
      assumeYes,
    );
  
    let localInvoke: LocalInvoke;
    try {
      await tunnelService.setup();
      const session: Session = tunnelService.getSession();
      const httpTrigger: TriggerConfig = getHttpTrigger(triggerConfigList);

      const tmpDir = await ensureTmpDir(argsData['tmp-dir'], devsPath, serviceConfig?.name, functionConfig?.name);
      localInvoke = new LocalInvoke(
        tunnelService,
        session?.sessionId,
        creds,
        region,
        baseDir,
        serviceConfig,
        functionConfig,
        httpTrigger,
        debugPort,
        debugIde,
        tmpDir,
        debuggerPath,
        debugArgs,
        nasBaseDir,
        assumeYes
      );
      await localInvoke.setup();
    } catch (ex) {
      try {
        await tunnelService.clean();
      } catch (_ex) {
        logger.debug(_ex);
      }
      try {
        await localInvoke?.clean?.();
      } catch (_ex) {
        logger.debug(_ex);
      }

      throw ex;
    }
  }

  /**
   * invoke
   * @param inputs
   * @returns
   */
  public async invoke(inputs: InputProps) {
    const { serviceConfig, functionConfig, region, creds, isHelp, access, appName, curPath, args } = await this.handlerInputs(inputs);
    if (isHelp) {
      // TODO: help info
      return;
    }
    // TODO: inputs validation

    const tunnelService: TunnelService = new TunnelService(creds, serviceConfig, functionConfig, region, access, appName, curPath);
    await tunnelService.invokeHelperFunction(args);
  }

  /**
   * cleanup
   * @param inputs
   * @returns
   */
  public async cleanup(inputs: InputProps) {
    const { serviceConfig, functionConfig, region, baseDir, creds, isHelp, access, appName, curPath } = await this.handlerInputs(inputs);
    if (isHelp) {
      // TODO: help info
      return;
    }

    const tunnelService: TunnelService = new TunnelService(creds, serviceConfig, functionConfig, region, access, appName, curPath);
    await tunnelService.clean();

    const localInvoke: LocalInvoke = new LocalInvoke(tunnelService, null, creds, region, baseDir, serviceConfig, functionConfig);
    await localInvoke.clean();
  }

  /**
   * @Decrepted
   * clean
   * @param inputs
   * @returns
   */
  public async clean(inputs: InputProps) {
    logger.warn("Method clean has been decrepted. Please use 's cleanup' from now on.");
    await this.cleanup(inputs);
  }
}
