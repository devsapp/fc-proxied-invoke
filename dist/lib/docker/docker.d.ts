import Container from 'dockerode';
import { NasConfig } from '../interface/nas';
import { ServiceConfig } from '../interface/fc-service';
import { FunctionConfig } from '../interface/fc-function';
import { ICredentials } from '../../common/entity';
export declare function generateRamdomContainerName(): string;
export declare function pullImageIfNeed(imageUrl: string): Promise<void>;
export declare function generateDockerCmd(runtime: string, isLocalStartInit: boolean, functionConfig?: FunctionConfig, httpMode?: boolean, invokeInitializer?: boolean, event?: any): string[];
export declare function generateDockerEnvs(creds: ICredentials, region: string, baseDir: string, serviceName: string, serviceProps: ServiceConfig, functionName: string, functionProps: FunctionConfig, debugPort: number, httpParams: any, nasConfig: NasConfig | string, debugIde: any, debugArgs?: any): Promise<any>;
export declare function runContainer(opts: any, outputStream?: any, errorStream?: any, context?: any): Promise<{
    container: any;
    stream: any;
}>;
export declare function resolveCodeUriToMount(absCodeUri: string, readOnly?: boolean): Promise<any>;
export declare function isDockerToolBoxAndEnsureDockerVersion(): Promise<boolean>;
export declare function resolveNasConfigToMounts(baseDir: string, serviceName: string, nasConfig: NasConfig | string, nasBaseDir: string): Promise<any>;
export declare function resolveLayerToMounts(absOptDir: any): {
    Type: string;
    Source: any;
    Target: string;
    ReadOnly: boolean;
};
export declare function resolveTmpDirToMount(absTmpDir: string): Promise<any>;
export declare function resolveDebuggerPathToMount(debuggerPath: string): Promise<any>;
export declare function resolvePasswdMount(): Promise<any>;
export declare function writeDebugIdeConfigForVscode(baseDir: string, serviceName: string, functionName: string, runtime: string, codeSource: string, debugPort?: number): Promise<void>;
export declare function showDebugIdeTipsForPycharm(codeSource: string, debugPort: number): Promise<void>;
export declare function startContainer(opts: any, outputStream?: any, errorStream?: any, context?: any): Promise<any>;
export declare function stopContainer(container: Container): Promise<void>;
