import * as core from "@serverless-devs/core";
import _ from 'lodash';

export async function setKVInState(key: string, value: any, stateId: string): Promise<void> {
    const state: any = await core.getState(stateId);
    if (_.isEmpty(state)) {
        await core.setState(stateId, { [key]: value });
    } else {
        Object.assign(state, {
            [key]: value,
        });
        await core.setState(stateId, state);
    }
}

export async function unsetKVInState(key: string, stateId: string): Promise<void> {
    const state: any = await core.getState(stateId);
    if (!state || !(key in state)) { return; }
    const resolvedState: any = _.omit(state, [key]);
    if (state) {
        await core.setState(stateId, resolvedState);
    }
}


