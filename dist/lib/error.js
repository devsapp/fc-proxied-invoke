"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwProcessedFCPermissionError = exports.printPermissionTip = exports.generatePolicyName = exports.throwProcessedPopPermissionError = void 0;
var logger_1 = __importDefault(require("../common/logger"));
function throwProcessedPopPermissionError(ex, action) {
    if (!ex.code || !ex.url || (ex.code !== 'NoPermission' && ex.code !== 'Forbidden.RAM' && !ex.code.includes('Forbbiden'))) { // NAS 返回的权限错误码是 Forbbiden.ram
        throw ex;
    }
    var productRegex = new RegExp(/https?:\/\/([a-zA-Z]*).(.*)aliyuncs.com/);
    var productRegexRes = productRegex.exec(ex.url);
    if (!productRegexRes) {
        throw ex;
    }
    var product = productRegexRes[1];
    action = product + ":" + action;
    var resource = '*';
    if (ex.data && ex.data.Message) {
        var regex = new RegExp(/Resource: (.*) Action: (.*)/);
        var res = regex.exec(ex.data.Message);
        if (res) {
            resource = res[1];
            action = res[2];
        }
    }
    var policyName = generatePolicyName(action);
    printPermissionTip(policyName, action, resource);
    throw ex;
}
exports.throwProcessedPopPermissionError = throwProcessedPopPermissionError;
function generatePolicyName(action) {
    var resourceArr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        resourceArr[_i - 1] = arguments[_i];
    }
    var resource = resourceArr && resourceArr.length ? resourceArr.join('-') : Math.random().toString(36).slice(-8);
    return "fun-generated-" + action.replace(/:/g, '-') + "-" + resource;
}
exports.generatePolicyName = generatePolicyName;
function printPermissionTip(policyName, action, resource) {
    var policy = {
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
    logger_1.default.error("\nYou can run the following commands to grant permission '" + action + "' on '" + resource + "' ");
    logger_1.default.error('Via the link:  https://shell.aliyun.com/ or aliyun cli');
    logger_1.default.error('(Note: aliyun cli tool needs to be configured with credentials that have related RAM permissions, such as primary account\'s AK)');
    logger_1.default.error('\n1. Create Policy');
    logger_1.default.error("Aliyun ram CreatePolicy --PolicyName " + policyName + " --PolicyDocument \"" + JSON.stringify(policy).replace(/"/g, '\\"') + "\"");
    logger_1.default.error('\n2. Attach Policy To User');
    logger_1.default.error("Aliyun ram AttachPolicyToUser --PolicyName " + policyName + " --PolicyType \"Custom\" --UserName \"YOUR_USER_NAME\"\n");
}
exports.printPermissionTip = printPermissionTip;
function throwProcessedFCPermissionError(ex, region) {
    var resourceArr = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        resourceArr[_i - 2] = arguments[_i];
    }
    if (!ex.code || ex.code !== 'AccessDenied' || !ex.message) {
        throw ex;
    }
    var regex = new RegExp(/the caller is not authorized to perform '(.*)' on resource '(.*)'/);
    var res = regex.exec(ex.message);
    if (!res) {
        throw ex;
    }
    var action = res[1];
    var resource = res[2];
    var policyName = generatePolicyName.apply(void 0, __spreadArrays([action, region], resourceArr));
    printPermissionTip(policyName, action, resource);
    throw ex;
}
exports.throwProcessedFCPermissionError = throwProcessedFCPermissionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBc0M7QUFFdEMsU0FBZ0IsZ0NBQWdDLENBQUMsRUFBTyxFQUFFLE1BQU07SUFDNUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxjQUFjLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxlQUFlLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsOEJBQThCO1FBQ3RKLE1BQU0sRUFBRSxDQUFDO0tBQ1o7SUFDRCxJQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0lBQzNFLElBQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxlQUFlLEVBQUU7UUFDbEIsTUFBTSxFQUFFLENBQUM7S0FDWjtJQUNELElBQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxNQUFNLEdBQU0sT0FBTyxTQUFJLE1BQVEsQ0FBQztJQUNoQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDbkIsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQzVCLElBQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEQsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksR0FBRyxFQUFFO1lBQ0wsUUFBUSxHQUFHLEdB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