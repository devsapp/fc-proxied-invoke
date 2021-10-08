import { FunctionConfig } from './interface/fc-function';
export declare const DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX: string;
export declare const DEFAULT_NAS_PATH_SUFFIX: string;
export declare function getRootBaseDir(baseDir: string): string;
export declare function detectNasBaseDir(devsPath: string): string;
export declare function detectTmpDir(devsPath: string, tmpDir?: string): string;
export declare function updateCodeUriWithBuildPath(baseDir: string, functionConfig: FunctionConfig, serviceName: string): FunctionConfig;
