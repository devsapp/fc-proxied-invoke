import { MountPoint, NasConfig } from '../interface/nas';
import path from 'path';
import * as fs from 'fs-extra';
import { isAutoConfig } from '../definition';
import logger from '../../common/logger'

export function convertNasConfigToMountCmd(nasConfig: NasConfig | string): any {
  const isNasAuto = isAutoConfig(nasConfig);

  if (!nasConfig) {
    return [];
  }

  if (isNasAuto) {
    logger.warning(`Remote nas won't be mounted to local when nasConfig is auto.`)
  }

  if (typeof nasConfig === 'string') {
    throw new Error(`Unsupported nasConfig: ${nasConfig} which should be 'auto' or 'Auto' when its type is string`);
  }

  const mountPoints: MountPoint[] = nasConfig.mountPoints;
  const mountCmds = mountPoints.map((mountPoint) => {
    return [
      'mount',
      '-t',
      'nfs',
      '-o',
      'vers=3,nolock,proto=tcp,rsize=1048576,wsize=1048576,hard,timeo=300,retrans=2,noresvport',
      `${mountPoint.serverAddr}:${mountPoint.nasDir}`,
      mountPoint.fcDir,
    ];
  });

  return mountCmds;
}

export function resolveMountPoint(mountPoint: MountPoint): any {
  return {
    serverPath: mountPoint.serverAddr, // 012194b28f-ujc20.cn-hangzhou.nas.aliyuncs.com
    mountSource: mountPoint.nasDir, // /
    mountDir: mountPoint.fcDir, // /mnt/auto
  };
}

export async function convertNasConfigToNasMappings(nasBaseDir: string, nasConfig: NasConfig | string, serviceName: string): Promise<any> {
  if (!nasConfig) {
    return [];
  }

  const isNasAuto = isAutoConfig(nasConfig);

  // console.log('convertNasConfigToNasMappings:: ', nasConfig);
  if (isNasAuto) {
    // support 'NasConfig: Auto'
    const nasDir = path.join(nasBaseDir, 'auto-default');

    const localNasDir = path.join(nasDir, serviceName);

    if (!(await fs.pathExists(localNasDir))) {
      await fs.ensureDir(localNasDir);
    }

    return [
      {
        localNasDir,
        remoteNasDir: '/mnt/auto',
      },
    ];
  }
  if (typeof nasConfig === 'string') {
    throw new Error(`Unsupported nasConfig: ${nasConfig} which should be 'auto' or 'Auto' when its type is string`);
  }
  const mountPoints: MountPoint[] = nasConfig.mountPoints;

  return await convertMountPointsToNasMappings(nasBaseDir, mountPoints);
}

async function convertMountPointsToNasMappings(nasBaseDir: string, mountPoints: MountPoint[]): Promise<any> {
  if (!mountPoints) {
    return [];
  }

  const nasMappings: Array<any> = [];

  for (let mountPoint of mountPoints) {
    const nasMapping = await convertMountPointToNasMapping(nasBaseDir, mountPoint);

    nasMappings.push(nasMapping);
  }

  return nasMappings;
}
async function convertMountPointToNasMapping(nasBaseDir: string, mountPoint: MountPoint): Promise<any> {
  const { mountSource, mountDir, serverPath } = resolveMountPoint(mountPoint);

  const nasDir = path.join(nasBaseDir, serverPath);

  if (!(await fs.pathExists(nasDir))) {
    await fs.ensureDir(nasDir);
  }

  const localNasDir: string = path.join(nasDir, mountSource);

  // The mounted nas directory must exist.
  if (!(await fs.pathExists(localNasDir))) {
    await fs.ensureDir(localNasDir);
  }

  return {
    localNasDir,
    remoteNasDir: mountDir,
  };
}
