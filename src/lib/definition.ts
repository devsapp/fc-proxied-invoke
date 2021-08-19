import {NasConfig} from "./interface/nas";
import _ from 'lodash';
import {TriggerConfig} from "./interface/fc-trigger";
import {LogConfig} from "./interface/sls";
import {CustomDomainConfig} from "./interface/fc-custom-domain";
import logger from '../common/logger';

export function isAutoConfig(config: any): boolean {
    // return config === 'auto' || config === 'Auto' || (config.type && (config.type === 'auto' || config.type === 'Auto'));
    if (typeof config === 'string') {
        return config.toLowerCase() === 'auto';
    }
    return false;
}

export function resolveAutoLogConfig(accountID: string, region: string, serviceName: string): LogConfig {
    return {
        project: _.toLower(`${accountID}-${region}-logproject`),
        logstore: _.toLower(`fc-service-${serviceName}-logstore`)
    };
}


export function getUserIdAndGroupId(nasConfig: NasConfig | string) {
    if (_.isEmpty(nasConfig)) { return {}; }

    if (typeof nasConfig === 'string' && nasConfig.toLowerCase() === 'auto') {
        return {
            userId: 10003,
            groupId: 10003
        };
    }
    return {
        // @ts-ignore
        userId: nasConfig.userId,
        // @ts-ignore
        groupId: nasConfig.groupId
    };
}

export function isHttpTrigger(triggerConfig: TriggerConfig) {
    return triggerConfig?.type === 'http';
}

export function getHttpTrigger(triggerConfigList: TriggerConfig[]): TriggerConfig | null {
    if (_.isEmpty(triggerConfigList)) { return null; }
    for (const trigger of triggerConfigList) {
        if (isHttpTrigger(trigger)) {
            // @ts-ignore
            return trigger;
        }
    }
    return null;
}

export function isCustomDomain(serviceName: string, functionName: string, customDomainConfigList: CustomDomainConfig[]): boolean {
    if (_.isEmpty(customDomainConfigList)) { return false; }
    for (const customDomain of customDomainConfigList) {
        if (_.isEmpty(customDomain?.routeConfigs)) { continue; }
        for (const routerConfig of customDomain?.routeConfigs) {
            if (routerConfig?.serviceName === serviceName && routerConfig?.functionName === functionName) {
                logger.debug(`Service: ${serviceName} and function: ${functionName} has custom domain config.`);
                return true;
            }
        }
    }
    return false;
}

export function genProxyContainerName(sessionId: string): string {
    if (sessionId) { return `TS-Local-${sessionId}`; }
    return '';
}
