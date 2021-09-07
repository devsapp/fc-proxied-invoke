import {ServiceConfig} from "../interface/fc-service";
import {FunctionConfig} from "../interface/fc-function";
import {TriggerConfig} from "../interface/fc-trigger";
import {ICredentials} from "../../common/entity";
import HttpInvoke from "./invoke/http-invoke";
import TunnelService from "../tunnel-service";

export default class LocalInvoke {
    private readonly serviceConfig: ServiceConfig;
    private readonly functionConfig: FunctionConfig;
    private readonly httpTrigger: TriggerConfig;
    private readonly region: string;
    private readonly creds: ICredentials;
    private readonly baseDir: string;
    private readonly debugPort?: number;
    private readonly debugIde?: any;
    private readonly nasBaseDir?: string;
    private readonly tmpDir?: string;
    private readonly debuggerPath?: string;
    private readonly debugArgs?: any;
    private readonly sessionId: string;
    private readonly httpInvoke: HttpInvoke;
    constructor(tunnelService: TunnelService, sessionId: string, creds: ICredentials, region: string, baseDir: string, userServiceConfig: ServiceConfig, userFunctionConfig: FunctionConfig, userHttpTrigger?: TriggerConfig, debugPort?: number, debugIde?: any, tmpDir?: string, debuggerPath?: any, debugArgs?: any, nasBaseDir?: string, assumeYes?: boolean,) {
        this.sessionId = sessionId;
        this.serviceConfig = userServiceConfig;
        this.functionConfig = userFunctionConfig;
        this.httpTrigger = userHttpTrigger;
        this.region = region;
        this.creds = creds;
        this.baseDir = baseDir;
        this.debugPort = debugPort;
        this.debugIde = debugIde;
        this.nasBaseDir = nasBaseDir;
        this.tmpDir = tmpDir;
        this.debuggerPath = debuggerPath;
        this.debugArgs = debugArgs;
        this.httpInvoke = new HttpInvoke(tunnelService, this.sessionId, this.creds, this.region, this.baseDir, this.serviceConfig, this.functionConfig, this.httpTrigger, this.debugPort, this.debugIde, this.tmpDir, this.debuggerPath, this.debugArgs, this.nasBaseDir, assumeYes);
    }

    public async setup(): Promise<any> {
        await this.httpInvoke.initAndStartRunner();
    }

    public async clean(): Promise<any> {
        await this.httpInvoke.clean();
    }




}
