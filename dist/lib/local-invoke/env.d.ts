import { NasConfig } from '../interface/nas';
export declare function addInstallTargetEnv(envVars: any, targets: any): any;
export declare function resolveLibPathsFromLdConf(baseDir: string, codeUri: string): Promise<any>;
export declare function addEnv(envVars: any, nasConfig?: NasConfig | string): any;
