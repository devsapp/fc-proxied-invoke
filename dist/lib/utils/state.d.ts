import { Session } from '../interface/session';
export declare function getInvokeContainerIdFromState(accountID: string, region: string, serviceName: string, functionName: string): Promise<any>;
export declare function getSessionFromState(accountID: string, region: string, serviceName: string, functionName: string): Promise<Session>;
export declare function getHelperConfigFromState(accountID: string, region: string, serviceName: string, functionName: string): Promise<any>;
export declare function getProxyContainerIdFromState(accountID: string, region: string, serviceName: string, functionName: string): Promise<any>;
export declare function genStateId(accountID: string, region: string, serviceName: string, functionName: string): string;
export declare function unsetInvokeContainerId(accountID: string, region: string, serviceName: string, functionName: string): Promise<void>;
