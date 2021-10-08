import { NasConfig } from "./interface/nas";
import { TriggerConfig } from "./interface/fc-trigger";
import { LogConfig } from "./interface/sls";
import { CustomDomainConfig } from "./interface/fc-custom-domain";
export declare function isAutoConfig(config: any): boolean;
export declare function resolveAutoLogConfig(accountID: string, region: string, serviceName: string): LogConfig;
export declare function getUserIdAndGroupId(nasConfig: NasConfig | string): {
    userId?: undefined;
    groupId?: undefined;
} | {
    userId: any;
    groupId: any;
};
export declare function isHttpTrigger(triggerConfig: TriggerConfig): boolean;
export declare function getHttpTrigger(triggerConfigList: TriggerConfig[]): TriggerConfig | null;
export declare function isCustomDomain(serviceName: string, functionName: string, customDomainConfigList: CustomDomainConfig[]): boolean;
export declare function genProxyContainerName(sessionId: string): string;
