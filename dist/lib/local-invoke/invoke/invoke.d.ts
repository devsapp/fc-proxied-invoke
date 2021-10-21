import { ServiceConfig } from '../../interface/fc-service';
import { NasConfig } from '../../interface/nas';
import { FunctionConfig } from '../../interface/fc-function';
import { TriggerConfig } from '../../interface/fc-trigger';
import { CustomDomainConfig } from '../../interface/fc-custom-domain';
import { ICredentials } from "../../../common/entity";
import TunnelService from '../../tunnel-service';
export default class Invoke {
    protected baseDir: string;
    protected region: string;
    protected serviceName: string;
    protected functionName: string;
    protected serviceConfig: ServiceConfig;
    protected functionConfig: FunctionConfig;
    protected runtime: string;
    protected codeUri: string;
    protected containerName: string;
    protected imageName: string;
    protected triggerConfig?: TriggerConfig;
    protected customDomainConfigList?: CustomDomainConfig[];
    protected debugPort?: number;
    protected debugIde?: any;
    protected nasBaseDir?: string;
    protected tmpDir?: string;
    protected debuggerPath?: string;
    protected debugArgs?: any;
    protected inited?: boolean;
    protected nasConfig?: NasConfig | string;
    protected dockerUser?: any;
    protected nasMounts?: any;
    protected unzippedCodeDir?: string;
    protected codeMount?: any;
    protected tmpDirMount?: any;
    protected debuggerMount?: any;
    protected passwdMount?: any;
    protected mounts?: any;
    protected nasMappingsMount?: any;
    protected creds: ICredentials;
    protected readonly sessionId: string;
    protected readonly tunnelService: TunnelService;
    constructor(tunnelService: TunnelService, sessionId: string, creds: ICredentials, region: string, baseDir: string, serviceConfig: ServiceConfig, functionConfig: FunctionConfig, triggerConfig?: TriggerConfig, debugPort?: number, debugIde?: any, tmpDir?: string, debuggerPath?: string, debugArgs?: any, nasBaseDir?: string);
    init(): Promise<void>;
    beforeInvoke(): Promise<void>;
    setDebugIdeConfig(): Promise<void>;
    cleanUnzippedCodeDir(): void;
    afterInvoke(): Promise<void>;
}