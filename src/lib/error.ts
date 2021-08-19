import Logger from '../common/logger';

export function throwProcessedPopPermissionError(ex: any, action) {
    if (!ex.code || !ex.url || (ex.code !== 'NoPermission' && ex.code !== 'Forbidden.RAM' && !ex.code.includes('Forbbiden'))) { // NAS 返回的权限错误码是 Forbbiden.ram
        throw ex;
    }
    const productRegex = new RegExp(/https?:\/\/([a-zA-Z]*).(.*)aliyuncs.com/);
    const productRegexRes = productRegex.exec(ex.url);
    if (!productRegexRes) {
        throw ex;
    }
    const product = productRegexRes[1];
    action = `${product}:${action}`;
    let resource = '*';
    if (ex.data && ex.data.Message) {
        const regex = new RegExp(/Resource: (.*) Action: (.*)/);
        const res = regex.exec(ex.data.Message);
        if (res) {
            resource = res[1];
            action = res[2];
        }
    }
    const policyName = generatePolicyName(action);
    printPermissionTip(policyName, action, resource);
    throw ex;
}

export function generatePolicyName(action: string, ...resourceArr): string {
    const resource = resourceArr && resourceArr.length ? resourceArr.join('-') : Math.random().toString(36).slice(-8);
    return `fun-generated-${action.replace(/:/g, '-')}-${resource}`;
}
export function printPermissionTip(policyName, action, resource) {
    const policy = {
        Version: '1',
        Statement: [
            {
                Effect: 'Allow',
                Action: [
                    action,
                ],
                Resource: [
                    resource,
                ],
            },
        ],
    };
    Logger.error(`\nYou can run the following commands to grant permission '${action}' on '${resource}' `);
    Logger.error('Via the link:  https://shell.aliyun.com/ or aliyun cli');
    Logger.error('(Note: aliyun cli tool needs to be configured with credentials that have related RAM permissions, such as primary account\'s AK)');
    Logger.error('\n1. Create Policy');
    Logger.error(`Aliyun ram CreatePolicy --PolicyName ${policyName} --PolicyDocument "${JSON.stringify(policy).replace(/"/g, '\\"')}"`);
    Logger.error('\n2. Attach Policy To User');
    Logger.error(`Aliyun ram AttachPolicyToUser --PolicyName ${policyName} --PolicyType "Custom" --UserName "YOUR_USER_NAME"\n`);
}

export function throwProcessedFCPermissionError(ex, region, ...resourceArr) {
    if (!ex.code || ex.code !== 'AccessDenied' || !ex.message) {
        throw ex;
    }
    const regex = new RegExp(/the caller is not authorized to perform '(.*)' on resource '(.*)'/);
    const res = regex.exec(ex.message);
    if (!res) {
        throw ex;
    }
    const action = res[1];
    const resource = res[2];
    const policyName = generatePolicyName(action, region, ...resourceArr);
    printPermissionTip(policyName, action, resource);
    throw ex;
}

