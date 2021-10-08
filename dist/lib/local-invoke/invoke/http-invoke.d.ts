import { ServiceConfig } from '../../interface/fc-service';
import { FunctionConfig } from '../../interface/fc-function';
import { TriggerConfig } from '../../interface/fc-trigger';
import Invoke from './invoke';
import { ICredentials } from '../../../common/entity';
import TunnelService from '../../tunnel-service';
export default class HttpInvoke extends Invoke {
    private runner;
    private watcher?;
    private assumeYes;
    constructor(tunnelService: TunnelService, sessionId: string, creds: ICredentials, region: string, baseDir: string, serviceConfig: ServiceConfig, functionConfig: FunctionConfig, triggerConfig?: TriggerConfig, debugPort?: number, debugIde?: any, tmpDir?: string, debuggerPath?: any, debugArgs?: any, nasBaseDir?: string, assumeYes?: boolean);
    _disableRunner(evt: any, name: any): Promise<void>;
    _startRunner(): Promise<void>;
    private saveInvokeContainerId;
    initWatch(): Promise<any>;
    initAndStartRunner(): Promise<void>;
    clean(): Promise<void>;
    cancelExecAndCleanAll(): Promise<void>;
}
