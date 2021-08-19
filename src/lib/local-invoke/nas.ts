import {MountPoint, NasConfig} from "../interface/nas";
import path from "path";
import * as fs from 'fs-extra';
import {isAutoConfig} from "../definition";

export function resolveMountPoint(mountPoint: MountPoint): any {
    return {
        serverPath: mountPoint.serverAddr,  // 012194b28f-ujc20.cn-hangzhou.nas.aliyuncs.com
        mountSource: mountPoint.nasDir,   // /
        mountDir: mountPoint.fcDir        // /mnt/auto
    };
}

export async function convertNasConfigToNasMappings(nasBaseDir: string, nasConfig: NasConfig | string, serviceName: string): Promise<any> {
    if (!nasConfig) { return []; }

    const isNasAuto = isAutoConfig(nasConfig);

    if (isNasAuto) { // support 'NasConfig: Auto'
        const nasDir = path.join(nasBaseDir, 'auto-default');

        const localNasDir = path.join(nasDir, serviceName);

        if (!(await fs.pathExists(localNasDir))) {
            await fs.ensureDir(localNasDir);
        }

        return [{
            localNasDir,
            remoteNasDir: '/mnt/auto'
        }];
    }
    if (typeof nasConfig === 'string') {
        throw new Error(`Unsupported nasConfig: ${nasConfig} which should be 'auto' or 'Auto' when its type is string`);
    }
    const mountPoints: MountPoint[] = nasConfig.mountPoints;

    return await convertMountPointsToNasMappings(nasBaseDir, mountPoints);
}

async function convertMountPointsToNasMappings(nasBaseDir: string, mountPoints: MountPoint[]): Promise<any> {
    if (!mountPoints) { return []; }

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
        remoteNasDir: mountDir
    };
}
