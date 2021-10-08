import { ServiceConfig } from "../interface/fc-service";
import { FunctionConfig } from "../interface/fc-function";
import { TriggerConfig } from "../interface/fc-trigger";
import { ICredentials } from "../../common/entity";
import TunnelService from "../tunnel-service";
export default class LocalInvoke {
    private readonly serviceConfig;
    private readonly functionConfig;
    private readonly httpTrigger;
    private readonly region;
    private readonly creds;
    private readonly baseDir;
    private readonly debugPort?;
    private readonly debugIde?;
    private readonly nasBaseDir?;
    private readonly tmpDir?;
    private readonly debuggerPath?;
    private readonly debugArgs?;
    private readonly sessionId;
    private readonly httpInvoke;
    constructor(tunnelService: TunnelService, sessionId: string, creds: ICredentials, region: string, baseDir: string, userServiceConfig: ServiceConfig, userFunctionConfig: FunctionConfig, userHttpTrigger?: TriggerConfig, debugPort?: number, debugIde?: any, tmpDir?: string, debuggerPath?: any, debugArgs?: any, nasBaseDir?: string, assumeYes?: boolean);
    setup(): Promise<any>;
    clean(): Promise<any>;
}
