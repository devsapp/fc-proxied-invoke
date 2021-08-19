import _ from 'lodash';
import * as core from '@serverless-devs/core';
import { Session } from '../interface/session';
import { unsetKVInState } from './devs';
import logger from '../../common/logger';

export async function getInvokeContainerIdFromState(accountID: string, region: string, serviceName: string, functionName: string): Promise<any> {
    return await getAttributeFromState(accountID, region, serviceName, functionName, 'invokeContainerId')
}

export async function getSessionFromState(accountID: string, region: string, serviceName: string, functionName: string): Promise<Session> {
    return await getAttributeFromState(accountID, region, serviceName, functionName, 'session')
}

export async function getHelperConfigFromState(accountID: string, region: string, serviceName: string, functionName: string): Promise<any> {
    return await getAttributeFromState(accountID, region, serviceName, functionName, 'helperConfig')
}
export async function getProxyContainerIdFromState(accountID: string, region: string, serviceName: string, functionName: string): Promise<any> {
    return await getAttributeFromState(accountID, region, serviceName, functionName, 'proxyContainerId')
}

async function getAttributeFromState(accountID: string, region: string, serviceName: string, functionName: string, attributeName: string): Promise<any> {
    const state: any = await getState(accountID, region, serviceName, functionName) || {};
    if (_.isEmpty(state[attributeName])) {
        switch (attributeName) {
            case 'proxyContainerId':
                logger.error(`Proxy container was not running. Please exec 's setup' first.`);
                break;
            case 'helperConfig':
                logger.error(`Helper resource has not been deployed. Please exec 's setup' first.`);
                break;
            case 'session':
                logger.error(`Session has not been established. Please exec 's setup' first.`);
                break;
            case 'invokeContainerId' :
                logger.error(`Proxy container was not running. Please exec 's setup' first.`);
                break;
            default:
                logger.error(`${attributeName} dose not exist in state file. Please exec 's setup' first.`);
                break;
        }
    }
    return state[attributeName];
}

export function genStateId(accountID: string, region: string, serviceName: string, functionName: string): string {
    return `${accountID}-${region}-${serviceName}-${functionName}`;
}

export async function unsetInvokeContainerId(accountID: string, region: string, serviceName: string, functionName: string): Promise<void> {
    await unsetKVInState('invokeContainerId', genStateId(accountID, region, serviceName, functionName));
}

async function getState(accountID: string, region: string, serviceName: string, functionName: string): Promise<any> {
    const stateId: string = genStateId(accountID, region, serviceName, functionName);
    return await core.getState(stateId);
}
