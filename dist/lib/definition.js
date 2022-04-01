"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genProxyContainerName = exports.isCustomDomain = exports.getHttpTrigger = exports.isHttpTrigger = exports.getUserIdAndGroupId = exports.resolveAutoLogConfig = exports.isAutoConfig = void 0;
var lodash_1 = __importDefault(require("lodash"));
var logger_1 = __importDefault(require("../common/logger"));
function isAutoConfig(config) {
    // return config === 'auto' || config === 'Auto' || (config.type && (config.type === 'auto' || config.type === 'Auto'));
    if (typeof config === 'string') {
        return config.toLowerCase() === 'auto';
    }
    return false;
}
exports.isAutoConfig = isAutoConfig;
function resolveAutoLogConfig(accountID, region, serviceName) {
    return {
        project: lodash_1.default.toLower(accountID + "-" + region + "-logproject"),
        logstore: lodash_1.default.toLower("fc-service-" + serviceName + "-logstore")
    };
}
exports.resolveAutoLogConfig = resolveAutoLogConfig;
function getUserIdAndGroupId(nasConfig) {
    if (lodash_1.default.isEmpty(nasConfig)) {
        return {};
    }
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
exports.getUserIdAndGroupId = getUserIdAndGroupId;
function isHttpTrigger(triggerConfig) {
    return (triggerConfig === null || triggerConfig === void 0 ? void 0 : triggerConfig.type) === 'http';
}
exports.isHttpTrigger = isHttpTrigger;
function getHttpTrigger(triggerConfigList) {
    if (lodash_1.default.isEmpty(triggerConfigList)) {
        return null;
    }
    for (var _i = 0, triggerConfigList_1 = triggerConfigList; _i < triggerConfigList_1.length; _i++) {
        var trigger = triggerConfigList_1[_i];
        if (isHttpTrigger(trigger)) {
            // @ts-ignore
            return trigger;
        }
    }
    return null;
}
exports.getHttpTrigger = getHttpTrigger;
function isCustomDomain(serviceName, functionName, customDomainConfigList) {
    if (lodash_1.default.isEmpty(customDomainConfigList)) {
        return false;
    }
    for (var _i = 0, customDomainConfigList_1 = customDomainConfigList; _i < customDomainConfigList_1.length; _i++) {
        var customDomain = customDomainConfigList_1[_i];
        if (lodash_1.default.isEmpty(customDomain === null || customDomain === void 0 ? void 0 : customDomain.routeConfigs)) {
            continue;
        }
        for (var _a = 0, _b = customDomain === null || customDomain === void 0 ? void 0 : customDomain.routeConfigs; _a < _b.length; _a++) {
            var routerConfig = _b[_a];
            if ((routerConfig === null || routerConfig === void 0 ? void 0 : routerConfig.serviceName) === serviceName && (routerConfig === null || routerConfig === void 0 ? void 0 : routerConfig.functionName) === functionName) {
                logger_1.default.debug("Service: " + serviceName + " and function: " + functionName + " has custom domain config.");
                return true;
            }
        }
    }
    return false;
}
exports.isCustomDomain = isCustomDomain;
function genProxyContainerName(sessionId) {
    if (sessionId) {
        return "TS-Local-" + sessionId;
    }
    return '';
}
exports.genProxyContainerName = genProxyContainerName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxrREFBdUI7QUFJdkIsNERBQXNDO0FBRXRDLFNBQWdCLFlBQVksQ0FBQyxNQUFXO0lBQ3BDLHdIQUF3SDtJQUN4SCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLENBQUM7S0FDMUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBTkQsb0NBTUM7QUFFRCxTQUFnQixvQkFBb0IsQ0FBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxXQUFtQjtJQUN2RixPQUFPO1FBQ0gsT0FBTyxFQUFFLGdCQUFDLENBQUMsT0FBTyxDQUFJLFNBQVMsU0FBSSxNQUFNLGdCQUFhLENBQUM7UUFDdkQsUUFBUSxFQUFFLGdCQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFjLFdBQVcsY0FBVyxDQUFDO0tBQzVELENBQUM7QUFDTixDQUFDO0FBTEQsb0RBS0M7QUFHRCxTQUFnQixtQkFBbUIsQ0FBQyxTQUE2QjtJQUM3RCxJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQUUsT0FBTyxFQUFFLENBQUM7S0FBRTtJQUV4QyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFO1FBQ3JFLE9BQU87WUFDSCxNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUM7S0FDTDtJQUNELE9BQU87UUFDSCxhQUFhO1FBQ2IsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3hCLGFBQWE7UUFDYixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87S0FDN0IsQ0FBQztBQUNOLENBQUM7QUFmRCxrREFlQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxhQUE0QjtJQUN0RCxPQUFPLENBQUEsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLElBQUksTUFBSyxNQUFNLENBQUM7QUFDMUMsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLGlCQUFrQztJQUM3RCxJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFBRSxPQUFPLElBQUksQ0FBQztLQUFFO0lBQ2xELEtBQXNCLFVBQWlCLEVBQWpCLHVDQUFpQixFQUFqQiwrQkFBaUIsRUFBakIsSUFBaUIsRUFBRTtRQUFwQyxJQUFNLE9BQU8sMEJBQUE7UUFDZCxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4QixhQUFhO1lBQ2IsT0FBTyxPQUFPLENBQUM7U0FDbEI7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFURCx3Q0FTQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxXQUFtQixFQUFFLFlBQW9CLEVBQUUsc0JBQTRDO0lBQ2xILElBQUksZ0JBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsRUFBRTtRQUFFLE9BQU8sS0FBSyxDQUFDO0tBQUU7SUFDeEQsS0FBMkIsVUFBc0IsRUFBdEIsaURBQXNCLEVBQXRCLG9DQUFzQixFQUF0QixJQUFzQixFQUFFO1FBQTlDLElBQU0sWUFBWSwrQkFBQTtRQUNuQixJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxZQUFZLENBQUMsRUFBRTtZQUFFLFNBQVM7U0FBRTtRQUN4RCxzQkFBMkIsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLFlBQVksd0JBQUU7WUFBbEQsSUFBTSxZQUFZLFNBQUE7WUFDbkIsSUFBSSxDQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxXQUFXLE1BQUssV0FBVyxJQUFJLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLFlBQVksTUFBSyxZQUFZLEVBQUU7Z0JBQzFGLGdCQUFNLENBQUMsS0FBSyxDQUFDLGNBQVksV0FBVyx1QkFBa0IsWUFBWSwrQkFBNEIsQ0FBQyxDQUFDO2dCQUNoRyxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7S0FDSjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFaRCx3Q0FZQztBQUVELFNBQWdCLHFCQUFxQixDQUFDLFNBQWlCO0lBQ25ELElBQUksU0FBUyxFQUFFO1FBQUUsT0FBTyxjQUFZLFNBQVcsQ0FBQztLQUFFO0lBQ2xELE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUhELHNEQUdDIn0=