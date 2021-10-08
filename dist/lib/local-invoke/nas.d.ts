import { MountPoint, NasConfig } from '../interface/nas';
export declare function convertNasConfigToMountCmd(nasConfig: NasConfig | string): any;
export declare function resolveMountPoint(mountPoint: MountPoint): any;
export declare function convertNasConfigToNasMappings(nasBaseDir: string, nasConfig: NasConfig | string, serviceName: string): Promise<any>;
