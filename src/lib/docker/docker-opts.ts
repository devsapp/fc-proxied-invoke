import * as httpx from 'httpx';
import * as _ from 'lodash';
import { addEnv } from '../local-invoke/env';
import logger from '../../common/logger';
import { getUserIdAndGroupId } from '../definition';
import nestedObjectAssign from 'nested-object-assign';
import { isCustomContainerRuntime } from '../utils/runtime';
import { mark } from '../utils/utils';

const REGISTRY_DEFAULT: string = 'registry.cn-beijing.aliyuncs.com';


const DEFAULT_REGISTRY: string = REGISTRY_DEFAULT || 'registry.hub.docker.com';
export const DOCKER_REGISTRIES: string[] = [
  "registry.cn-beijing.aliyuncs.com",
  "registry.hub.docker.com"
];
const IMAGE_VERSION: string = process.env.FC_DOCKER_VERSION || '1.9.21';


let DOCKER_REGISTRY_CACHE;


const NAS_UID: number = 10003;
const NAS_GID: number = 10003;

const runtimeImageMap: {[key: string]: string} = {
  'nodejs6': 'nodejs6',
  'nodejs8': 'nodejs8',
  'nodejs10': 'nodejs10',
  'nodejs12': 'nodejs12',
  'python2.7': 'python2.7',
  'python3': 'python3.6',
  'java8': 'java8',
  'java11': 'java11',
  'php7.2': 'php7.2',
  'dotnetcore2.1': 'dotnetcore2.1',
  'custom': 'custom'
};


export async function resolveImageNameForPull(imageName: string): Promise<string> {

  const dockerImageRegistry = await resolveDockerRegistry();

  if (dockerImageRegistry) {
    imageName = `${dockerImageRegistry}/${imageName}`;
  }
  return imageName;
}


// Not Run stage:
//  for linux platform, it will always use process.uid and process.gid
//  for mac and windows platform, it will always use 0
// Run stage:
//  for linux platform, it will always use process.uid and process.gid
//  for mac and windows platform, it will use 10003 if no nasConfig, otherwise it will use nasConfig userId
export function resolveDockerUser({nasConfig, stage = 'run'}): string {
  let { userId, groupId } = getUserIdAndGroupId(nasConfig);

  if (process.platform === 'linux') {
    logger.debug('For linux platform, Fc will use host userId and groupId to build or run your functions');
    userId = process.getuid();
    groupId = process.getgid();
  } else {
    if (stage === 'run') {
      if (userId === -1 || userId === undefined) {
        userId = NAS_UID;
      }
      if (groupId === -1 || groupId === undefined) {
        groupId = NAS_GID;
      }
    } else {
      userId = 0;
      groupId = 0;
    }
  }

  return `${userId}:${groupId}`;
}


export function generateInstallOpts(imageName: string, mounts: any, envs: any): any {
  return {
    Image: imageName,
    Tty: true,
    Env: resolveDockerEnv(envs),
    Cmd: ['/bin/bash'],
    HostConfig: {
      AutoRemove: true,
      Mounts: mounts
    }
  };
}

export function transformMountsForToolbox(mounts) {

  console.warn(`We detected that you are using docker toolbox. For a better experience, please upgrade 'docker for windows'.\nYou can refer to Chinese doc https://github.com/alibaba/funcraft/blob/master/docs/usage/installation-zh.md#windows-%E5%AE%89%E8%A3%85-docker or English doc https://github.com/alibaba/funcraft/blob/master/docs/usage/installation.md.\n`);

  if (Array.isArray(mounts)) {
    return mounts.map(m => {

      return transformSourcePathOfMount(m);
    });
  }
  return transformSourcePathOfMount(mounts);
}

function transformSourcePathOfMount(mountsObj) {

  if (!_.isEmpty(mountsObj)) {

    const replaceMounts = Object.assign({}, mountsObj);
    replaceMounts.Source = transformPathForVirtualBox(mountsObj.Source);
    return replaceMounts;
  }
  return {};
}

export function transformPathForVirtualBox(source) {
  // C:\\Users\\image_crawler\\code -> /c/Users/image_crawler/code
  const sourcePath = source.split(':').join('');
  const lowerFirstAndReplace = _.lowerFirst(sourcePath.split('\\').join('/'));
  return '/' + lowerFirstAndReplace;
}

export function generateContainerNameFilter(containerName: string, inited?: boolean): string {
  if (inited) {
    return `{"name": ["${containerName}-inited"]}`;
  }
  return `{"name": ["${containerName}"]}`;
}


export function generateContainerName(serviceName: string, functionName: string, debugPort?: number): string {
  return `fc-local-${serviceName}-${functionName}`.replace(/ /g, '')
    + (debugPort ? '-debug' : '-run');
}

export async function generateLocalStartOpts(proxyContainerName: string, runtime, name, mounts, cmd, envs, limitedHostConfig, { debugPort, dockerUser, debugIde = null, imageName }) {
  if (isCustomContainerRuntime(runtime)) {
    return genCustomContainerLocalStartOpts(proxyContainerName, name, mounts, cmd, envs, imageName,limitedHostConfig);
  }
  return await genNonCustomContainerLocalStartOpts(proxyContainerName, runtime, name, mounts, cmd, debugPort, envs, dockerUser, debugIde, limitedHostConfig);
}

async function genNonCustomContainerLocalStartOpts(proxyContainerName, runtime, name, mounts, cmd, debugPort, envs, dockerUser, debugIde, limitedHostConfig) {
  const { Memory, Ulimits, CpuPeriod, CpuQuota } = limitedHostConfig;
  const hostOpts: any = {
    HostConfig: {
      AutoRemove: true,
      Mounts: mounts,
      Privileged: true,
      Memory,
      Ulimits,
      CpuPeriod,
      CpuQuota
    }
  };
  if (!_.isEmpty(proxyContainerName)) {
    hostOpts.HostConfig.NetworkMode = `container:${proxyContainerName}`;
  }


  const imageName = await resolveRuntimeToDockerImage(runtime);

  supportCustomBootstrapFile(runtime, envs);

  const opts = nestedObjectAssign(
    {
      Env: resolveDockerEnv(envs),
      Image: imageName,
      name,
      Cmd: cmd,
      User: dockerUser,
      Entrypoint: [resolveMockScript(runtime)]
    },
    hostOpts);
  const encryptedOpts: any = encryptDockerOpts(opts);

  logger.debug(`docker options: ${JSON.stringify(encryptedOpts, null, '  ')}`);
  return opts;
}

// /**
//  * 支持通过 BOOTSTRAP_FILE 环境变量改变 bootstrap 文件名。
// **/
function supportCustomBootstrapFile(runtime, envs) {
  if (runtime === 'custom') {
    if (envs['BOOTSTRAP_FILE']) {
      envs['AGENT_SCRIPT'] = envs['BOOTSTRAP_FILE'];
    }
  }
}

export function resolveMockScript(runtime: string): string {
  return `/var/fc/runtime/${runtime}/mock`;
}

function encryptDockerOpts(dockerOpts: any): any {
  const encryptedOpts: any = _.cloneDeep(dockerOpts);
  if (encryptedOpts?.Env) {
    const encryptedEnv: any = encryptedOpts.Env.map((e: string) => {
      if (e.startsWith("FC_ACCESS_KEY_ID") || e.startsWith("FC_ACCESS_KEY_SECRET") || e.startsWith("FC_ACCOUNT_ID")) {
        const keyValueList: string[] = e.split('=');
        const encrptedVal: string = mark(keyValueList[1]);
        return `${keyValueList[0]}=${encrptedVal}`;
      } else {
        return e;
      }
    });
    encryptedOpts.Env = encryptedEnv;
  }
  return encryptedOpts;
}

function genCustomContainerLocalStartOpts(proxyContainerName, name, mounts, cmd, envs, imageName, limitedHostConfig) {
  const { Memory, Ulimits, CpuPeriod, CpuQuota } = limitedHostConfig;
  const hostOpts: any = {
    HostConfig: {
      AutoRemove: true,
      Mounts: mounts,
      Privileged: true,
      Memory,
      Ulimits,
      CpuPeriod,
      CpuQuota
    }
  };
  if (!_.isEmpty(proxyContainerName)) {
    hostOpts.HostConfig.NetworkMode = `container:${proxyContainerName}`;
  }

  const opts: any = {
    Env: resolveDockerEnv(envs, true),
    Image: imageName,
    name
  };
  if (cmd !== []) {
    opts.Cmd = cmd;
  }
  const ioOpts = {
    OpenStdin: true,
    Tty: false,
    StdinOnce: true,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true
  };
  const dockerOpts = nestedObjectAssign(opts, hostOpts, ioOpts);
  const encryptedOpts: any = encryptDockerOpts(dockerOpts);

  logger.debug(`docker options for custom container: ${JSON.stringify(encryptedOpts, null, '  ')}`);
  return dockerOpts;
}

export async function resolveDockerRegistry(): Promise<any> {
  // await doImageRegisterEventTag('start');
  if (DOCKER_REGISTRY_CACHE) {
    return DOCKER_REGISTRY_CACHE;
  }
  const promises = DOCKER_REGISTRIES.map(r => httpx.request(`https://${r}/v2/aliyunfc/runtime-nodejs8/tags/list`, { timeout: 3000 }).then(() => r));
  try {
    DOCKER_REGISTRY_CACHE = await Promise.race(promises);
  } catch (error) {
    DOCKER_REGISTRY_CACHE = DEFAULT_REGISTRY;
  }
  // await doImageRegisterEventTag(DOCKER_REGISTRY_CACHE);
  return DOCKER_REGISTRY_CACHE;
}


export function resolveDockerEnv(envs = {}, isCustomContainer = false): string[] {
  if (isCustomContainer) {
    return _.map(envs || {}, (v, k) => `${k}=${v}`);
  }
  return _.map(addEnv(envs || {}), (v, k) => `${k}=${v}`);
}

export async function resolveRuntimeToDockerImage(runtime: string, isBuild?: boolean): Promise<string> {
  if (runtimeImageMap[runtime]) {
    const name = runtimeImageMap[runtime];
    var imageName;
    if (isBuild) {
      imageName = `aliyunfc/runtime-${name}:build-${IMAGE_VERSION}`;
    } else {
      imageName = `aliyunfc/runtime-${name}:${IMAGE_VERSION}`;
    }

    logger.debug('imageName: ' + imageName);
    return imageName;
  }
  throw new Error(`invalid runtime name ${runtime}`);
}
