"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./common/logger"));
var lodash_1 = __importDefault(require("lodash"));
var core = __importStar(require("@serverless-devs/core"));
var stdout_formatter_1 = __importDefault(require("./lib/component/stdout-formatter"));
var path_1 = __importDefault(require("path"));
var devs_1 = require("./lib/devs");
var tunnel_service_1 = __importDefault(require("./lib/tunnel-service"));
var local_invoke_1 = __importDefault(require("./lib/local-invoke/local-invoke"));
var validate_1 = require("./lib/validate");
var definition_1 = require("./lib/definition");
var debug_1 = require("./lib/local-invoke/debug");
var path_2 = require("./lib/utils/path");
var FcTunnelInvokeComponent = /** @class */ (function () {
    function FcTunnelInvokeComponent() {
    }
    FcTunnelInvokeComponent.prototype.handlerInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var project, access, creds, properties, appName, args, curPath, devsPath, nasBaseDir, baseDir, projectName, region, parsedArgs, argsData, serviceConfig, triggerConfigList, customDomainConfigList, functionConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 1:
                        _a.sent();
                        project = inputs === null || inputs === void 0 ? void 0 : inputs.project;
                        access = project === null || project === void 0 ? void 0 : project.access;
                        return [4 /*yield*/, core.getCredential(access)];
                    case 2:
                        creds = _a.sent();
                        validate_1.validateCredentials(creds);
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args.replace(/(^\s*)|(\s*$)/g, '');
                        curPath = inputs === null || inputs === void 0 ? void 0 : inputs.path;
                        devsPath = curPath === null || curPath === void 0 ? void 0 : curPath.configPath;
                        nasBaseDir = devs_1.detectNasBaseDir(devsPath);
                        baseDir = path_1.default.dirname(devsPath);
                        projectName = project === null || project === void 0 ? void 0 : project.projectName;
                        region = properties.region;
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            return [2 /*return*/, {
                                    region: region,
                                    creds: creds,
                                    path: path_1.default,
                                    args: args,
                                    access: access,
                                    isHelp: true,
                                }];
                        }
                        serviceConfig = properties === null || properties === void 0 ? void 0 : properties.service;
                        triggerConfigList = properties === null || properties === void 0 ? void 0 : properties.triggers;
                        customDomainConfigList = properties === null || properties === void 0 ? void 0 : properties.customDomains;
                        functionConfig = devs_1.updateCodeUriWithBuildPath(baseDir, properties === null || properties === void 0 ? void 0 : properties.function, serviceConfig.name);
                        return [2 /*return*/, {
                                serviceConfig: serviceConfig,
                                functionConfig: functionConfig,
                                triggerConfigList: triggerConfigList,
                                customDomainConfigList: customDomainConfigList,
                                region: region,
                                creds: creds,
                                curPath: curPath,
                                args: args,
                                appName: appName,
                                projectName: projectName,
                                devsPath: devsPath,
                                nasBaseDir: nasBaseDir,
                                baseDir: baseDir,
                                access: access,
                            }];
                }
            });
        });
    };
    /**
     * setup
     * @param inputs
     * @returns
     */
    FcTunnelInvokeComponent.prototype.setup = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, serviceConfig, functionConfig, triggerConfigList, customDomainConfigList, region, devsPath, nasBaseDir, baseDir, creds, isHelp, access, appName, curPath, parsedArgs, argsData, assumeYes, _c, debugPort, debugIde, debuggerPath, debugArgs, memorySize, vpcConfig, nasConfig, isVpcAuto, tunnelService, localInvoke, session, httpTrigger, tmpDir, ex_1, _ex_1, _ex_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _b = _d.sent(), serviceConfig = _b.serviceConfig, functionConfig = _b.functionConfig, triggerConfigList = _b.triggerConfigList, customDomainConfigList = _b.customDomainConfigList, region = _b.region, devsPath = _b.devsPath, nasBaseDir = _b.nasBaseDir, baseDir = _b.baseDir, creds = _b.creds, isHelp = _b.isHelp, access = _b.access, appName = _b.appName, curPath = _b.curPath;
                        if (isHelp) {
                            // TODO: help info
                            return [2 /*return*/];
                        }
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['debug', 'assume-yes'],
                            alias: {
                                help: 'h',
                                'debug-port': 'd',
                                'assume-yes': 'y',
                                config: 'c',
                            },
                        });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        assumeYes = argsData.y || argsData.assumeYes || argsData['assume-yes'];
                        _c = debug_1.getDebugOptions(argsData), debugPort = _c.debugPort, debugIde = _c.debugIde, debuggerPath = _c.debuggerPath, debugArgs = _c.debugArgs;
                        memorySize = argsData['memory-size'];
                        if (debugIde && !FcTunnelInvokeComponent.supportedDebugIde.includes(lodash_1.default.toLower(debugIde))) {
                            logger_1.default.error("Unsupported ide: " + debugIde + " for debugging.Only " + FcTunnelInvokeComponent.supportedDebugIde + " are supported");
                            return [2 /*return*/];
                        }
                        vpcConfig = serviceConfig.vpcConfig;
                        nasConfig = serviceConfig.nasConfig;
                        isVpcAuto = definition_1.isAutoConfig(serviceConfig.vpcConfig);
                        if (!isVpcAuto && typeof vpcConfig === 'string') {
                            logger_1.default.error("Unsupported vpcConfig: " + vpcConfig + " which should be 'auto' or 'Auto' when its type is string");
                            return [2 /*return*/];
                        }
                        if (typeof vpcConfig === 'undefined' && !definition_1.isAutoConfig(nasConfig) && typeof nasConfig !== 'undefined') {
                            logger_1.default.error("Unsupported vpcConfig: vpcConfig can't be 'undefined' when nasConfig was not 'auto'");
                            return [2 /*return*/];
                        }
                        if (isVpcAuto && !definition_1.isAutoConfig(nasConfig)) {
                            logger_1.default.error("Unsupported vpcConfig: vpcConfig can't be 'auto' or 'Auto' when nasConfig was not 'auto'");
                            return [2 /*return*/];
                        }
                        tunnelService = new tunnel_service_1.default(creds, serviceConfig, functionConfig, region, access, appName, curPath, triggerConfigList, customDomainConfigList, debugPort, debugIde, memorySize, assumeYes);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 6, , 14]);
                        return [4 /*yield*/, tunnelService.setup()];
                    case 3:
                        _d.sent();
                        session = tunnelService.getSession();
                        httpTrigger = definition_1.getHttpTrigger(triggerConfigList);
                        return [4 /*yield*/, path_2.ensureTmpDir(argsData['tmp-dir'], devsPath, serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.name, functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name)];
                    case 4:
                        tmpDir = _d.sent();
                        localInvoke = new local_invoke_1.default(tunnelService, session === null || session === void 0 ? void 0 : session.sessionId, creds, region, baseDir, serviceConfig, functionConfig, httpTrigger, debugPort, debugIde, tmpDir, debuggerPath, debugArgs, nasBaseDir, assumeYes);
                        return [4 /*yield*/, localInvoke.setup()];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 14];
                    case 6:
                        ex_1 = _d.sent();
                        _d.label = 7;
                    case 7:
                        _d.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, tunnelService.clean()];
                    case 8:
                        _d.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        _ex_1 = _d.sent();
                        logger_1.default.debug(_ex_1);
                        return [3 /*break*/, 10];
                    case 10:
                        _d.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, ((_a = localInvoke === null || localInvoke === void 0 ? void 0 : localInvoke.clean) === null || _a === void 0 ? void 0 : _a.call(localInvoke))];
                    case 11:
                        _d.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        _ex_2 = _d.sent();
                        logger_1.default.debug(_ex_2);
                        return [3 /*break*/, 13];
                    case 13: throw ex_1;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * invoke
     * @param inputs
     * @returns
     */
    FcTunnelInvokeComponent.prototype.invoke = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, serviceConfig, functionConfig, region, creds, isHelp, access, appName, curPath, args, tunnelService;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _a = _b.sent(), serviceConfig = _a.serviceConfig, functionConfig = _a.functionConfig, region = _a.region, creds = _a.creds, isHelp = _a.isHelp, access = _a.access, appName = _a.appName, curPath = _a.curPath, args = _a.args;
                        if (isHelp) {
                            // TODO: help info
                            return [2 /*return*/];
                        }
                        tunnelService = new tunnel_service_1.default(creds, serviceConfig, functionConfig, region, access, appName, curPath);
                        return [4 /*yield*/, tunnelService.invokeHelperFunction(args)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * cleanup
     * @param inputs
     * @returns
     */
    FcTunnelInvokeComponent.prototype.cleanup = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, serviceConfig, functionConfig, region, baseDir, creds, isHelp, access, appName, curPath, tunnelService, localInvoke;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _a = _b.sent(), serviceConfig = _a.serviceConfig, functionConfig = _a.functionConfig, region = _a.region, baseDir = _a.baseDir, creds = _a.creds, isHelp = _a.isHelp, access = _a.access, appName = _a.appName, curPath = _a.curPath;
                        if (isHelp) {
                            // TODO: help info
                            return [2 /*return*/];
                        }
                        tunnelService = new tunnel_service_1.default(creds, serviceConfig, functionConfig, region, access, appName, curPath);
                        return [4 /*yield*/, tunnelService.clean()];
                    case 2:
                        _b.sent();
                        localInvoke = new local_invoke_1.default(tunnelService, null, creds, region, baseDir, serviceConfig, functionConfig);
                        return [4 /*yield*/, localInvoke.clean()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @Decrepted
     * clean
     * @param inputs
     * @returns
     */
    FcTunnelInvokeComponent.prototype.clean = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.warning("Method clean has been decrepted. Please use 's cleanup' from now on.");
                        return [4 /*yield*/, this.cleanup(inputs)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcTunnelInvokeComponent.supportedDebugIde = ['vscode', 'intellij'];
    return FcTunnelInvokeComponent;
}());
exports.default = FcTunnelInvokeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXFDO0FBRXJDLGtEQUF1QjtBQUN2QiwwREFBOEM7QUFDOUMsc0ZBQStEO0FBTS9ELDhDQUF3QjtBQUN4QixtQ0FBMEU7QUFDMUUsd0VBQWlEO0FBQ2pELGlGQUEwRDtBQUMxRCwyQ0FBcUQ7QUFDckQsK0NBQWdFO0FBQ2hFLGtEQUEyRDtBQUMzRCx5Q0FBZ0Q7QUFLaEQ7SUFBQTtJQXNPQSxDQUFDO0lBbk9PLCtDQUFhLEdBQW5CLFVBQW9CLE1BQWtCOzs7Ozs0QkFDcEMscUJBQU0sMEJBQWUsQ0FBQyxVQUFVLEVBQUUsRUFBQTs7d0JBQWxDLFNBQWtDLENBQUM7d0JBQzdCLE9BQU8sR0FBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTyxDQUFDO3dCQUMxQixNQUFNLEdBQVcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sQ0FBQzt3QkFDWCxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBdEQsS0FBSyxHQUFpQixTQUFnQzt3QkFDNUQsOEJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRXJCLFVBQVUsR0FBZ0IsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQzt3QkFFeEMsT0FBTyxHQUFXLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLENBQUM7d0JBRWxDLElBQUksR0FBVyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDMUQsT0FBTyxHQUFRLE1BQU0sYUFBTixNQUFNLHVCQUFO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