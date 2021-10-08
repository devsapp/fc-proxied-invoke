import { Session } from './interface/session';
import { ICredentials } from "../common/entity";
import { ServiceConfig } from "./interface/fc-service";
import { FunctionConfig } from "./interface/fc-function";
import { TriggerConfig } from "./interface/fc-trigger";
import { CustomDomainConfig } from "./interface/fc-custom-domain";
export default class TunnelService {
    private readonly credentials;
    private readonly region;
    private readonly userServiceConfig;
    private readonly userFunctionConfig;
    private readonly userTriggerConfigList;
    private readonly userCustomDomainConfigList;
    private readonly access;
    private readonly appName;
    private readonly path;
    private readonly debugPort?;
    private readonly debugIde?;
    private memorySize?;
    private client;
    private fcClient;
    private session;
    private static readonly maxRetryCnt;
    private static readonly tunnerServiceHost;
    private static readonly proxyImageName;
    private static readonly proxyImageStableVersion;
    private static readonly helperImageStableVersion;
    private static readonly helperImageVersion;
    private static readonly proxyImageVersion;
    private static readonly proxyImageRepo;
    private static readonly proxyImaggeRegistry;
    private static readonly cacheDirPath;
    private static readonly runtimeListNeedSetTsAdjustFLag;
    private runner;
    private streamOfRunner;
    private stdoutFileWriteStream;
    private stderrFileWriteStream;
    private assumeYes;
    constructor(credentials: ICredentials, userServiceConfig: ServiceConfig, userFunctionConfig: FunctionConfig, region: string, access: string, appName: string, path: any, userTriggerConfigList?: TriggerConfig[], userCustomDomainConfigList?: CustomDomainConfig[], debugPort?: number, debugIde?: string, memorySize?: number, assumeYes?: boolean);
    setup(): Promise<any>;
    private makeCleanerFunction;
    private generateSessionName;
    private cleanFunctionContainer;
    private createSession;
    private deleteSession;
    private genHelperServiceConfig;
    private genHelperFunctionConfig;
    private genHelperCustomDomainConfig;
    private makeHelperFunction;
    deleteOssTrigger(): Promise<void>;
    saveHelperFunctionDeployRes(deployRes: any): Promise<any>;
    saveSession(): Promise<any>;
    genStateId(): string;
    setHelperFunctionProvision(helperServiceName: string, helperFunctionName: string, targetProvision: number, targetAlias?: string): Promise<void>;
    private unsetHelperFunctionConfig;
    private setHelperFunctionConfig;
    private genOutputFileOfProxyContainer;
    private runProxyContainer;
    private saveProxyContainerId;
    private unsetProxyContainerId;
    private generateProxyContainerDebugOpts;
    private generateProxyContainerOpts;
    private generateProxyContainerEnv;
    private queryUntilSessionEstablished;
    invokeHelperFunction(args?: string): Promise<any>;
    checkIfProxyContainerRunning(): Promise<boolean>;
    clean(): Promise<any>;
    getSession(): Session;
}
