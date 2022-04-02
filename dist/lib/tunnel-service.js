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
var logger_1 = __importDefault(require("../common/logger"));
var core = __importStar(require("@serverless-devs/core"));
var client_1 = require("./client/client");
var lodash_1 = __importDefault(require("lodash"));
var YAML = __importStar(require("js-yaml"));
var fc_deploy_1 = require("./component/fc-deploy");
var time_1 = require("./utils/time");
var docker_1 = require("./docker/docker");
var nested_object_assign_1 = __importDefault(require("nested-object-assign"));
var utils_1 = require("./utils/utils");
var path = __importStar(require("path"));
var os = __importStar(require("os"));
var fse = __importStar(require("fs-extra"));
var tunnel_service20210509_1 = require("@alicloud/tunnel-service20210509");
var tunnel_service20210509_2 = __importDefault(require("@alicloud/tunnel-service20210509"));
var definition_1 = require("./definition");
var process_1 = require("./utils/process");
var stream_1 = require("./utils/stream");
var fc_remote_invoke_1 = require("./component/fc-remote-invoke");
var devs_1 = require("./utils/devs");
var dockerode_1 = __importDefault(require("dockerode"));
var runtime_1 = require("./utils/runtime");
var stdout_formatter_1 = __importDefault(require("./component/stdout-formatter"));
var error_processor_1 = require("./error-processor");
var retry_1 = require("./retry");
var state_1 = require("./utils/state");
var fc_api_1 = require("./component/fc-api");
var deploy_1 = require("./helper/deploy");
var prompt_1 = require("./prompt");
var docker = new dockerode_1.default();
var IDE_PYCHARM = 'pycharm';
var TunnelService = /** @class */ (function () {
    function TunnelService(credentials, userServiceConfig, userFunctionConfig, region, access, appName, path, userTriggerConfigList, userCustomDomainConfigList, debugPort, debugIde, memorySize, assumeYes) {
        var _this = this;
        var _a, _b;
        this.credentials = credentials;
        this.userServiceConfig = userServiceConfig;
        this.userFunctionConfig = userFunctionConfig;
        this.userTriggerConfigList = userTriggerConfigList;
        this.userCustomDomainConfigList = userCustomDomainConfigList;
        this.debugPort = debugPort;
        this.debugIde = debugIde;
        this.region = region;
        this.access = access;
        this.appName = appName;
        this.path = path;
        this.memorySize = memorySize;
        this.assumeYes = assumeYes;
        var config = {
            accessKeyId: (_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccessKeyID,
            accessKeySecret: (_b = this.credentials) === null || _b === void 0 ? void 0 : _b.AccessKeySecret,
            regionId: this.region,
            endpoint: TunnelService.tunnerServiceHost
        };
        this.client = new tunnel_service20210509_2.default(config);
        process_1.setSigint();
        // exit container, when use ctrl + c
        process.on('SIGINT', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, stdoutFilePath, stderrFilePath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // end stream
                        if (this.streamOfRunner) {
                            stream_1.writeEventToStreamAndClose(this.streamOfRunner);
                        }
                        if (!this.runner) return [3 /*break*/, 3];
                        logger_1.default.info("Received canncel request, stopping running proxy container.....");
                        return [4 /*yield*/, docker_1.stopContainer(this.runner)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.unsetProxyContainerId()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a = this.genOutputFileOfProxyContainer(), stdoutFilePath = _a.stdoutFilePath, stderrFilePath = _a.stderrFilePath;
                        if (this.stdoutFileWriteStream) {
                            this.stdoutFileWriteStream.close(function (err) {
                                if (err) {
                                    logger_1.default.warning("Close stdout file of proxy container: " + stdoutFilePath + " failed!\nError: " + err);
                                }
                            });
                        }
                        if (this.stderrFileWriteStream) {
                            this.stderrFileWriteStream.close(function (err) {
                                if (err) {
                                    logger_1.default.warning("Close stderr file of proxy container: " + stderrFilePath + " failed!\nError: " + err);
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    }
    TunnelService.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alicloudClient, _a, createSessionVm, e_1, proxyContainerVm, e_2, checkVm, e_3;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        alicloudClient = new client_1.AlicloudClient(this.credentials);
                        _a = this;
                        return [4 /*yield*/, alicloudClient.getFcClient(this.region)];
                    case 1:
                        _a.fcClient = _b.sent();
                        createSessionVm = core.spinner("Creating session...");
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, retry_1.promiseRetry(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, ex_1, policy;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 3, , 4]);
                                            _a = this;
                                            return [4 /*yield*/, this.createSession()];
                                        case 1:
                                            _a.session = _b.sent();
                                            createSessionVm.succeed("Session created, session id: " + this.session.sessionId + ".");
                                            return [4 /*yield*/, this.saveSession()];
                                        case 2:
                                            _b.sent();
                                            return [2 /*return*/];
                                        case 3:
                                            ex_1 = _b.sent();
                                            if (ex_1.toString().includes('code: 403, You do not have permission to perform this operation')) {
                                                policy = {
                                                    "Statement": [
                                                        {
                                                            "Effect": "Allow",
                                                            "Action": "tns:*",
                                                            "Resource": "*"
                                                        }
                                                    ],
                                                    "Version": "1"
                                                };
                                                logger_1.default.error("Your access must attch a RAM policy as follow:");
                                                console.log('\x1b[35m%s\x1b[0m', JSON.stringify(policy, null, 4));
                                                throw ex_1;
                                            }
                                            logger_1.default.debug("Create session failed, error is: \n" + ex_1);
                                            logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.retry('session', 'create', '', times));
                                            retry(ex_1);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        createSessionVm.fail("Create session failed.");
                        throw e_1;
                    case 5:
                        // TODO: empty sessioin
                        logger_1.default.info("Deploying helper function...");
                        return [4 /*yield*/, this.makeCleanerFunction()];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.makeHelperFunction()];
                    case 7:
                        _b.sent();
                        proxyContainerVm = core.spinner("Starting proxy container...");
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, this.runProxyContainer(proxyContainerVm)];
                    case 9:
                        _b.sent();
                        proxyContainerVm.succeed("Proxy container is running.");
                        return [3 /*break*/, 11];
                    case 10:
                        e_2 = _b.sent();
                        proxyContainerVm.fail("Start proxy container failed.");
                        throw e_2;
                    case 11:
                        checkVm = core.spinner("Checking if session is established...");
                        _b.label = 12;
                    case 12:
                        _b.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, this.queryUntilSessionEstablished()];
                    case 13:
                        _b.sent();
                        checkVm.succeed("Session established!");
                        return [3 /*break*/, 15];
                    case 14:
                        e_3 = _b.sent();
                        checkVm.fail("Session establish fail.");
                        // TODO: clean 操作
                        throw e_3;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.makeCleanerFunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alicloudClient, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.fcClient) return [3 /*break*/, 2];
                        alicloudClient = new client_1.AlicloudClient(this.credentials);
                        _a = this;
                        return [4 /*yield*/, alicloudClient.getFcClient(this.region)];
                    case 1:
                        _a.fcClient = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, deploy_1.deployCleaner(this.fcClient, this.credentials)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.generateSessionName = function () {
        return "session_" + this.region + "_" + this.userServiceConfig.name;
    };
    TunnelService.prototype.cleanFunctionContainer = function () {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var invokeContainerId, container;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, state_1.getInvokeContainerIdFromState((_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccountID, this.region, (_b = this.userServiceConfig) === null || _b === void 0 ? void 0 : _b.name, (_c = this.userFunctionConfig) === null || _c === void 0 ? void 0 : _c.name)];
                    case 1:
                        invokeContainerId = _g.sent();
                        return [4 /*yield*/, docker.getContainer(invokeContainerId)];
                    case 2:
                        container = _g.sent();
                        return [4 /*yield*/, docker_1.stopContainer(container)];
                    case 3:
                        _g.sent();
                        return [4 /*yield*/, state_1.unsetInvokeContainerId((_d = this.credentials) === null || _d === void 0 ? void 0 : _d.AccountID, this.region, (_e = this.userServiceConfig) === null || _e === void 0 ? void 0 : _e.name, (_f = this.userFunctionConfig) === null || _f === void 0 ? void 0 : _f.name)];
                    case 4:
                        _g.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.createSession = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var sessionName, req, res, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sessionName = this.generateSessionName();
                        req = new tunnel_service20210509_1.CreateSessionRequest({ sessionName: sessionName });
                        logger_1.default.debug("Session name is : " + sessionName);
                        return [4 /*yield*/, this.client.createSession(req)];
                    case 1:
                        res = _b.sent();
                        data = (_a = res === null || res === void 0 ? void 0 : res.body) === null || _a === void 0 ? void 0 : _a.data;
                        logger_1.default.debug("Create session result data: " + JSON.stringify(data, null, '  '));
                        return [2 /*return*/, {
                                name: data === null || data === void 0 ? void 0 : data.sessionName,
                                sessionId: data === null || data === void 0 ? void 0 : data.sessionId,
                                localInstanceId: data === null || data === void 0 ? void 0 : data.localInstanceId,
                                remoteInstanceId: data === null || data === void 0 ? void 0 : data.remoteInstanceId
                            }];
                }
            });
        });
    };
    TunnelService.prototype.deleteSession = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.deleteSession(sessionId)];
                    case 1:
                        res = _a.sent();
                        body = res === null || res === void 0 ? void 0 : res.body;
                        logger_1.default.debug("Delete session body: " + JSON.stringify(body, null, '  '));
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.genHelperServiceConfig = function () {
        var _a, _b;
        var helperServiceConfig = lodash_1.default.cloneDeep(this.userServiceConfig);
        helperServiceConfig.name = "SESSION-" + ((_a = this.session) === null || _a === void 0 ? void 0 : _a.sessionId.substring(0, 7));
        // 添加 description
        helperServiceConfig.description = "Auto generated proxied session: " + ((_b = this.session) === null || _b === void 0 ? void 0 : _b.sessionId);
        // 开启公网访问
        helperServiceConfig.internetAccess = true;
        // 删除 nas 配置
        // if (isAutoConfig(helperServiceConfig?.nasConfig)) { delete helperServiceConfig.nasConfig; }
        delete helperServiceConfig.nasConfig;
        // 删除 auto 的 logconfig 配置
        if (helperServiceConfig.logConfig && (helperServiceConfig.logConfig === 'auto' || helperServiceConfig.logConfig === 'Auto')) {
            delete helperServiceConfig.logConfig;
        }
        return helperServiceConfig;
    };
    TunnelService.prototype.genHelperFunctionConfig = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        var helperFunctionConfig = {
            name: (_a = this.userFunctionConfig) === null || _a === void 0 ? void 0 : _a.name,
            description: "Helper function generated by fc-tunnel-invoke component",
            runtime: 'custom-container',
            handler: (_b = this.userFunctionConfig) === null || _b === void 0 ? void 0 : _b.handler,
            timeout: 600,
            memorySize: this.memorySize || 128,
            customContainerConfig: {
                image: "registry." + this.region + ".aliyuncs.com/aliyunfc/ts-remote:" + TunnelService.helperImageVersion
            },
            environmentVariables: {
                'TUNNEL_SERVICE_HOST': TunnelService.tunnerServiceHost,
                'TUNNEL_SERVICE_INSTANCE_ID': (_c = this.session) === null || _c === void 0 ? void 0 : _c.remoteInstanceId,
                'TUNNEL_SERVICE_SESSION_ID': (_d = this.session) === null || _d === void 0 ? void 0 : _d.sessionId,
                'TUNNEL_SERVICE_AK_ID': (_e = this.credentials) === null || _e === void 0 ? void 0 : _e.AccessKeyID,
                'TUNNEL_SERVICE_AK_SECRET': (_f = this.credentials) === null || _f === void 0 ? void 0 : _f.AccessKeySecret
            }
        };
        // Add TS_DEBUG_HTTP_TRIGGER_ADJUST env for nodejs/python/php/java http trigger
        if (!lodash_1.default.isEmpty(definition_1.getHttpTrigger(this.userTriggerConfigList))) {
            TunnelService.runtimeListNeedSetTsAdjustFLag.forEach(function (runtime) {
                var _a;
                if (((_a = _this.userFunctionConfig) === null || _a === void 0 ? void 0 : _a.runtime.indexOf(runtime)) !== -1) {
                    Object.assign(helperFunctionConfig.environmentVariables, {
                        'TS_DEBUG_HTTP_TRIGGER_ADJUST': true
                    });
                }
            });
        }
        if (((_g = this.userFunctionConfig) === null || _g === void 0 ? void 0 : _g.initializationTimeout) && ((_h = this.userFunctionConfig) === null || _h === void 0 ? void 0 : _h.initializer)) {
            Object.assign(helperFunctionConfig, {
                initializationTimeout: (_j = this.userFunctionConfig) === null || _j === void 0 ? void 0 : _j.initializationTimeout,
                initializer: (_k = this.userFunctionConfig) === null || _k === void 0 ? void 0 : _k.initializer,
            });
        }
        if ((_l = this.userFunctionConfig) === null || _l === void 0 ? void 0 : _l.instanceLifecycleConfig) {
            Object.assign(helperFunctionConfig, {
                instanceLifecycleConfig: (_m = this.userFunctionConfig) === null || _m === void 0 ? void 0 : _m.instanceLifecycleConfig,
            });
        }
        if ((_o = this.userFunctionConfig) === null || _o === void 0 ? void 0 : _o.instanceConcurrency) {
            Object.assign(helperFunctionConfig, {
                instanceConcurrency: (_p = this.userFunctionConfig) === null || _p === void 0 ? void 0 : _p.instanceConcurrency
            });
        }
        if ((_q = this.userFunctionConfig) === null || _q === void 0 ? void 0 : _q.asyncConfiguration) {
            Object.assign(helperFunctionConfig, {
                asyncConfiguration: (_r = this.userFunctionConfig) === null || _r === void 0 ? void 0 : _r.asyncConfiguration
            });
        }
        return helperFunctionConfig;
    };
    TunnelService.prototype.genHelperCustomDomainConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customDomainConfigList, _i, _a, userDomain, routeConfigList, domain, fcDomain, inputs, domainName;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (lodash_1.default.isEmpty(this.userCustomDomainConfigList)) {
                            return [2 /*return*/, []];
                        }
                        customDomainConfigList = [];
                        _i = 0, _a = this.userCustomDomainConfigList;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        userDomain = _a[_i];
                        routeConfigList = userDomain === null || userDomain === void 0 ? void 0 : userDomain.routeConfigs.map(function (useRouter) {
                            var _a, _b;
                            if ((useRouter === null || useRouter === void 0 ? void 0 : useRouter.serviceName) && (useRouter === null || useRouter === void 0 ? void 0 : useRouter.serviceName) === ((_a = _this.userServiceConfig) === null || _a === void 0 ? void 0 : _a.name) && (useRouter === null || useRouter === void 0 ? void 0 : useRouter.functionName) && (useRouter === null || useRouter === void 0 ? void 0 : useRouter.functionName) === ((_b = _this.userFunctionConfig) === null || _b === void 0 ? void 0 : _b.name)) {
                                var router = lodash_1.default.cloneDeep(useRouter);
                                router === null || router === void 0 ? true : delete router.serviceName;
                                router === null || router === void 0 ? true : delete router.functionName;
                                return router;
                            }
                            if (!(useRouter === null || useRouter === void 0 ? void 0 : useRouter.serviceName) && !(useRouter === null || useRouter === void 0 ? void 0 : useRouter.functionName)) {
                                return useRouter;
                            }
                        });
                        domain = {
                            domainName: userDomain === null || userDomain === void 0 ? void 0 : userDomain.domainName,
                            protocol: userDomain === null || userDomain === void 0 ? void 0 : userDomain.protocol,
                            routeConfigs: routeConfigList.filter(function (r) { return (r); }),
                        };
                        if (!(domain.domainName.toLowerCase() === 'auto')) return [3 /*break*/, 4];
                        return [4 /*yield*/, core.loadComponent('devsapp/domain')];
                    case 2:
                        fcDomain = _b.sent();
                        inputs = {
                            credentials: this.credentials,
                            props: {
                                type: 'fc',
                                user: this.credentials.AccountID,
                                region: this.region,
                                service: this.userServiceConfig.name,
                                function: this.userFunctionConfig.name
                            },
                            project: {
                                access: this.access
                            }
                        };
                        logger_1.default.debug("get proxy function inputs = " + inputs);
                        return [4 /*yield*/, fcDomain.get(inputs)];
                    case 3:
                        domainName = _b.sent();
                        domain.domainName = domainName;
                        _b.label = 4;
                    case 4:
                        if (userDomain === null || userDomain === void 0 ? void 0 : userDomain.certConfig) {
                            Object.assign(domain, {
                                certConfig: domain === null || domain === void 0 ? void 0 : domain.certConfig
                            });
                        }
                        console.log('\x1b[35m%s\x1b[0m', "[FC-PROXIED-INVOKE] get helper function " + this.userServiceConfig.name + "/" + this.userFunctionConfig.name + " domainName: " + domain.domainName);
                        customDomainConfigList.push(domain);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, customDomainConfigList];
                }
            });
        });
    };
    TunnelService.prototype.makeHelperFunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var helperServiceConfig, helperFunctionConfig, helperTriggerConfigList, helperCustomDomainConfigList, fcDeployComponent, fcDeployComponentInputs, fcDeployComponentIns;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helperServiceConfig = this.genHelperServiceConfig();
                        helperFunctionConfig = this.genHelperFunctionConfig();
                        helperTriggerConfigList = this.userTriggerConfigList;
                        return [4 /*yield*/, this.genHelperCustomDomainConfig()];
                    case 1:
                        helperCustomDomainConfigList = _a.sent();
                        fcDeployComponent = new fc_deploy_1.FcDeployComponent(this.region, helperServiceConfig, this.access, this.appName, this.path, helperFunctionConfig, helperTriggerConfigList, helperCustomDomainConfigList);
                        fcDeployComponentInputs = fcDeployComponent.genComponentInputs('fc-deploy', 'fc-deploy-project', '--use-local', 'deploy');
                        return [4 /*yield*/, core.loadComponent("devsapp/fc-deploy")];
                    case 2:
                        fcDeployComponentIns = _a.sent();
                        return [4 /*yield*/, retry_1.promiseRetry(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var deployRes, alicloudClient, _a, _ex_1, setHelperVm, e_4, e_5, errProcessRes, e_6;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 12, , 20]);
                                            return [4 /*yield*/, fcDeployComponentIns.deploy(fcDeployComponentInputs)];
                                        case 1:
                                            deployRes = _b.sent();
                                            return [4 /*yield*/, this.saveHelperFunctionDeployRes(deployRes)];
                                        case 2:
                                            _b.sent();
                                            _b.label = 3;
                                        case 3:
                                            _b.trys.push([3, 6, , 7]);
                                            alicloudClient = new client_1.AlicloudClient(this.credentials);
                                            _a = this;
                                            return [4 /*yield*/, alicloudClient.getFcClient(this.region)];
                                        case 4:
                                            _a.fcClient = _b.sent();
                                            return [4 /*yield*/, this.fcClient.invokeFunction(helperServiceConfig.name, helperFunctionConfig.name, '')];
                                        case 5:
                                            _b.sent();
                                            return [3 /*break*/, 7];
                                        case 6:
                                            _ex_1 = _b.sent();
                                            return [3 /*break*/, 7];
                                        case 7:
                                            setHelperVm = core.spinner("Setting helper function with 1 provison and 0 elasticity");
                                            _b.label = 8;
                                        case 8:
                                            _b.trys.push([8, 10, , 11]);
                                            return [4 /*yield*/, this.setHelperFunctionConfig(helperServiceConfig.name, helperFunctionConfig.name)];
                                        case 9:
                                            _b.sent();
                                            setHelperVm.succeed("Helper function is set to 1 provison and 0 elasticity.");
                                            return [3 /*break*/, 11];
                                        case 10:
                                            e_4 = _b.sent();
                                            setHelperVm.fail("Fail to set provison and elasticity for helper function.");
                                            throw e_4;
                                        case 11: return [3 /*break*/, 20];
                                        case 12:
                                            e_5 = _b.sent();
                                            return [4 /*yield*/, fcDeployComponentIns.remove(fcDeployComponentInputs)];
                                        case 13:
                                            _b.sent();
                                            return [4 /*yield*/, error_processor_1.processMakeHelperFunctionErr(e_5, times, this.assumeYes)];
                                        case 14:
                                            errProcessRes = _b.sent();
                                            if (!(errProcessRes === 'deleteOssTrigger')) return [3 /*break*/, 19];
                                            _b.label = 15;
                                        case 15:
                                            _b.trys.push([15, 17, , 18]);
                                            return [4 /*yield*/, this.deleteOssTrigger()];
                                        case 16:
                                            _b.sent();
                                            return [3 /*break*/, 18];
                                        case 17:
                                            e_6 = _b.sent();
                                            logger_1.default.debug(e_6);
                                            throw new Error("Attempt to delete oss trigger failed. Please delete it manually: https://fc.console.aliyun.com/fc/overview. You can also use s fc-api component: https://github.com/devsapp/fc-api.");
                                        case 18:
                                            retry(e_5);
                                            _b.label = 19;
                                        case 19: return [3 /*break*/, 20];
                                        case 20: return [2 /*return*/];
                                    }
                                });
                            }); }, 1)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.deleteOssTrigger = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcApi, fcApiComponent, listServicesInputs, servicesList, _a, _b, functionsList, triggersList, ossTriggers, needDeleteOssTriggers, _c, deleteOssTriggerTasks, deleteRes, e_7;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-api')];
                    case 1:
                        fcApi = _d.sent();
                        logger_1.default.info("Delete remote OSS trigger...");
                        fcApiComponent = new fc_api_1.FcApiComponent(this.region, this.access, this.appName, this.path, this.userServiceConfig, this.userFunctionConfig);
                        listServicesInputs = fcApiComponent.genComponentInputs('fc-api', 'fc-api-project', '', 'listServices', this.credentials);
                        _b = (_a = YAML).load;
                        return [4 /*yield*/, fcApi.listServices(listServicesInputs)];
                    case 2:
                        servicesList = _b.apply(_a, [_d.sent()]);
                        return [4 /*yield*/, Promise.all(servicesList.map(function (service) { return __awaiter(_this, void 0, void 0, function () {
                                var listFunctionsInputs, functions, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            listFunctionsInputs = fcApiComponent.genComponentInputs('fc-api', 'fc-api-project', "--serviceName " + service.serviceName, 'listFunctions', this.credentials);
                                            _b = (_a = YAML).load;
                                            return [4 /*yield*/, fcApi.listFunctions(listFunctionsInputs)];
                                        case 1:
                                            functions = _b.apply(_a, [_c.sent()]);
                                            functions = functions.map(function (func) {
                                                return { serviceName: service.serviceName, functionName: func.functionName };
                                            });
                                            return [2 /*return*/, functions];
                                    }
                                });
                            }); }))];
                    case 3:
                        functionsList = _d.sent();
                        functionsList = lodash_1.default.flatten(functionsList);
                        return [4 /*yield*/, Promise.all(functionsList.map(function (func) { return __awaiter(_this, void 0, void 0, function () {
                                var listTriggersInputs, triggers, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            listTriggersInputs = fcApiComponent.genComponentInputs('fc-api', 'fc-api-project', "--functionName " + func.functionName + " --serviceName " + func.serviceName, 'listTriggers', this.credentials);
                                            _b = (_a = YAML).load;
                                            return [4 /*yield*/, fcApi.listTriggers(listTriggersInputs)];
                                        case 1:
                                            triggers = _b.apply(_a, [_c.sent()]);
                                            triggers.forEach(function (trigger) {
                                                Object.assign(trigger, { serviceName: func.serviceName, functionName: func.functionName });
                                            });
                                            return [2 /*return*/, triggers];
                                    }
                                });
                            }); }))];
                    case 4:
                        triggersList = _d.sent();
                        ossTriggers = lodash_1.default.flatten(triggersList).filter(function (trigger) { return trigger.triggerType === 'oss'; });
                        needDeleteOssTriggers = ossTriggers.filter(function (ossTrigger) {
                            return lodash_1.default.find(_this.userTriggerConfigList, function (userTrigger) {
                                return userTrigger.type === 'oss' &&
                                    userTrigger.sourceArn === ossTrigger.sourceArn &&
                                    userTrigger.config.filter.key.prefix === ossTrigger.triggerConfig.filter.key.prefix;
                            });
                        });
                        if (lodash_1.default.isEmpty(needDeleteOssTriggers)) {
                            throw new Error("Remove oss triggers fail: Unable to locate conflicting trigger. Please remove oss triggers manually: https://fc.console.aliyun.com/fc/overview.");
                        }
                        needDeleteOssTriggers = needDeleteOssTriggers.map(function (trigger) {
                            trigger.region = trigger.sourceArn.split(':')[2];
                            return trigger;
                        });
                        logger_1.default.info("The following triggers will be deleted:\n" + YAML.dump(needDeleteOssTriggers.map(function (trigger) {
                            return {
                                region: trigger.region,
                                serviceName: trigger.serviceName,
                                functionName: trigger.functionName,
                                triggerName: trigger.triggerName,
                            };
                        })));
                        _c = this.assumeYes;
                        if (_c) return [3 /*break*/, 6];
                        return [4 /*yield*/, prompt_1.isDeleteOssTriggerAndContinue()];
                    case 5:
                        _c = (_d.sent());
                        _d.label = 6;
                    case 6:
                        if (!_c) return [3 /*break*/, 11];
                        deleteOssTriggerTasks = needDeleteOssTriggers.map(function (trigger) { return __awaiter(_this, void 0, void 0, function () {
                            var deleteTriggerInputs;
                            return __generator(this, function (_a) {
                                deleteTriggerInputs = fcApiComponent.genComponentInputs('fc-api', 'fc-api-project', "--region " + trigger.region + " --serviceName " + trigger.serviceName + " --functionName " + trigger.functionName + " --triggerName " + trigger.triggerName, 'deleteTrigger', this.credentials);
                                return [2 /*return*/, fcApi.deleteTrigger(deleteTriggerInputs)];
                            });
                        }); });
                        _d.label = 7;
                    case 7:
                        _d.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, Promise.all(deleteOssTriggerTasks)];
                    case 8:
                        deleteRes = _d.sent();
                        logger_1.default.debug(deleteRes);
                        logger_1.default.info('Trigger ossTrigger delete success');
                        return [3 /*break*/, 10];
                    case 9:
                        e_7 = _d.sent();
                        throw e_7;
                    case 10: return [3 /*break*/, 12];
                    case 11: throw new Error('The operation has been cancelled by the user.');
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.saveHelperFunctionDeployRes = function (deployRes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, devs_1.setKVInState('helperConfig', deployRes, this.genStateId())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.saveSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, devs_1.setKVInState('session', this.session, this.genStateId())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.genStateId = function () {
        var _a, _b;
        return this.credentials.AccountID + "-" + this.region + "-" + ((_a = this.userServiceConfig) === null || _a === void 0 ? void 0 : _a.name) + "-" + ((_b = this.userFunctionConfig) === null || _b === void 0 ? void 0 : _b.name);
    };
    TunnelService.prototype.setHelperFunctionProvision = function (helperServiceName, helperFunctionName, targetProvision, targetAlias) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var alias, alicloudClient, _c, e_8, provisionRes, retryCnt;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        alias = targetAlias || 'LATEST';
                        if (!!this.fcClient) return [3 /*break*/, 2];
                        alicloudClient = new client_1.AlicloudClient(this.credentials);
                        _c = this;
                        return [4 /*yield*/, alicloudClient.getFcClient(this.region)];
                    case 1:
                        _c.fcClient = _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.fcClient.putProvisionConfig(helperServiceName, helperFunctionName, alias, { target: targetProvision })];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_8 = _d.sent();
                        throw new Error("Put provision config error: " + e_8 + ", please make sure that your account has updateService permission.");
                    case 5: return [4 /*yield*/, this.fcClient.getProvisionConfig(helperServiceName, helperFunctionName, alias)];
                    case 6:
                        provisionRes = _d.sent();
                        retryCnt = 0;
                        _d.label = 7;
                    case 7:
                        if (!(((_a = provisionRes === null || provisionRes === void 0 ? void 0 : provisionRes.data) === null || _a === void 0 ? void 0 : _a.current) !== 1 && retryCnt <= TunnelService.maxRetryCnt)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.fcClient.getProvisionConfig(helperServiceName, helperFunctionName, alias)];
                    case 8:
                        provisionRes = _d.sent();
                        retryCnt = retryCnt + 1;
                        logger_1.default.debug("Retry setting provision " + retryCnt + " times.");
                        return [4 /*yield*/, time_1.sleep(3000)];
                    case 9:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 10:
                        if (((_b = provisionRes === null || provisionRes === void 0 ? void 0 : provisionRes.data) === null || _b === void 0 ? void 0 : _b.current) !== 1) {
                            logger_1.default.debug(JSON.stringify(provisionRes, null, '  '));
                            // TODO: 指定具体权限
                            throw new Error("Set/get provision of helper function error.Please make sure you have the related ram permission.");
                        }
                        logger_1.default.debug("Set provision result: " + JSON.stringify(provisionRes === null || provisionRes === void 0 ? void 0 : provisionRes.data));
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.unsetHelperFunctionConfig = function (serviceName, functionName, alias) {
        return __awaiter(this, void 0, void 0, function () {
            var method, path, alicloudClient, _a, elasticityRes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // 预留设置为 0
                    return [4 /*yield*/, this.setHelperFunctionProvision(serviceName, functionName, 0, alias)];
                    case 1:
                        // 预留设置为 0
                        _b.sent();
                        method = 'DELETE';
                        path = "/services/" + serviceName + "." + alias + "/functions/" + functionName + "/on-demand-config";
                        if (!!this.client) return [3 /*break*/, 3];
                        alicloudClient = new client_1.AlicloudClient(this.credentials);
                        _a = this;
                        return [4 /*yield*/, alicloudClient.getFcClient(this.region)];
                    case 2:
                        _a.fcClient = _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.fcClient.request(method, path, null, JSON.stringify({}))];
                    case 4:
                        elasticityRes = _b.sent();
                        logger_1.default.debug("On-demand config delete result: " + (elasticityRes === null || elasticityRes === void 0 ? void 0 : elasticityRes.statusCode));
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.setHelperFunctionConfig = function (serviceName, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var alias, method, path, alicloudClient, _a, elasticityRes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        alias = 'LATEST';
                        // Set provision to 1
                        return [4 /*yield*/, this.setHelperFunctionProvision(serviceName, functionName, 1, alias)];
                    case 1:
                        // Set provision to 1
                        _b.sent();
                        method = 'PUT';
                        path = "/services/" + serviceName + "." + alias + "/functions/" + functionName + "/on-demand-config";
                        if (!!this.fcClient) return [3 /*break*/, 3];
                        alicloudClient = new client_1.AlicloudClient(this.credentials);
                        _a = this;
                        return [4 /*yield*/, alicloudClient.getFcClient(this.region)];
                    case 2:
                        _a.fcClient = _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.fcClient.request(method, path, null, JSON.stringify({ "maximumInstanceCount": 0 }))];
                    case 4:
                        elasticityRes = _b.sent();
                        logger_1.default.debug("On-demand config put result: " + (elasticityRes === null || elasticityRes === void 0 ? void 0 : elasticityRes.statusCode));
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.genOutputFileOfProxyContainer = function () {
        var _a;
        if (!lodash_1.default.isEmpty(this.session)) {
            var outputDirOfContainer = path.join(TunnelService.cacheDirPath, (_a = this.session) === null || _a === void 0 ? void 0 : _a.sessionId);
            // await fse.ensureDir(outputDirOfContainer);
            var stdoutFilePath = path.join(outputDirOfContainer, 'stdout.log');
            var stderrFilePath = path.join(outputDirOfContainer, 'stderr.log');
            return {
                stdoutFilePath: stdoutFilePath,
                stderrFilePath: stderrFilePath
            };
        }
        return {};
    };
    TunnelService.prototype.runProxyContainer = function (vm) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var imageUrl, opts, _b, stdoutFilePath, stderrFilePath, proxyContainer;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        imageUrl = TunnelService.proxyImaggeRegistry + "/" + TunnelService.proxyImageRepo + "/" + TunnelService.proxyImageName + ":" + TunnelService.proxyImageVersion;
                        // pull image if need
                        vm === null || vm === void 0 ? void 0 : vm.stop();
                        return [4 /*yield*/, docker_1.pullImageIfNeed(imageUrl)];
                    case 1:
                        _c.sent();
                        vm === null || vm === void 0 ? void 0 : vm.start();
                        opts = this.generateProxyContainerOpts();
                        _b = this.genOutputFileOfProxyContainer(), stdoutFilePath = _b.stdoutFilePath, stderrFilePath = _b.stderrFilePath;
                        return [4 /*yield*/, fse.ensureDir(path.dirname(stdoutFilePath))];
                    case 2:
                        _c.sent();
                        logger_1.default.debug("Container: " + (opts === null || opts === void 0 ? void 0 : opts.name) + " stdout to: " + stdoutFilePath + ", stderr to: " + stderrFilePath);
                        this.stdoutFileWriteStream = fse.createWriteStream(stdoutFilePath, { flag: 'w+', encoding: 'utf-8', autoClose: true });
                        this.stderrFileWriteStream = fse.createWriteStream(stderrFilePath, { flag: 'w+', encoding: 'utf-8', autoClose: true });
                        return [4 /*yield*/, docker_1.runContainer(opts, this.stdoutFileWriteStream, this.stderrFileWriteStream)];
                    case 3:
                        proxyContainer = _c.sent();
                        this.streamOfRunner = proxyContainer === null || proxyContainer === void 0 ? void 0 : proxyContainer.stream;
                        this.runner = proxyContainer === null || proxyContainer === void 0 ? void 0 : proxyContainer.container;
                        return [4 /*yield*/, this.saveProxyContainerId((_a = this.runner) === null || _a === void 0 ? void 0 : _a.id)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.saveProxyContainerId = function (containerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, devs_1.setKVInState('proxyContainerId', containerId, this.genStateId())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.unsetProxyContainerId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, devs_1.unsetKVInState('proxyContainerId', this.genStateId())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.generateProxyContainerDebugOpts = function () {
        var _a, _b;
        var _c;
        var runtime = (_c = this.userFunctionConfig) === null || _c === void 0 ? void 0 : _c.runtime;
        if (runtime_1.isCustomContainerRuntime(runtime)) {
            return {};
        }
        var exposedPort = this.debugPort + "/tcp";
        if (this.debugIde === IDE_PYCHARM) {
            if (runtime !== 'python2.7' && runtime !== 'python3' && runtime !== 'python3.9') {
                throw new Error(IDE_PYCHARM + " debug config only support for runtime [python2.7, python3, python3.9]");
            }
            else {
                return {};
            }
        }
        else if (runtime === 'php7.2') {
            return {};
        }
        else {
            return {
                ExposedPorts: (_a = {},
                    _a[exposedPort] = {},
                    _a),
                HostConfig: {
                    PortBindings: (_b = {},
                        _b[exposedPort] = [
                            {
                                'HostIp': '',
                                'HostPort': "" + this.debugPort
                            }
                        ],
                        _b)
                }
            };
        }
    };
    TunnelService.prototype.generateProxyContainerOpts = function () {
        var _a;
        var imageName = TunnelService.proxyImaggeRegistry + "/" + TunnelService.proxyImageRepo + "/" + TunnelService.proxyImageName + ":" + TunnelService.proxyImageVersion;
        var containerName = definition_1.genProxyContainerName((_a = this.session) === null || _a === void 0 ? void 0 : _a.sessionId);
        var ioOpts = {
            OpenStdin: false,
            Tty: false,
            StdinOnce: true,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true
        };
        var hostOpts = {
            HostConfig: {
                AutoRemove: true,
                Privileged: true,
                Mounts: []
            }
        };
        var debugOpts = {};
        if (this.debugPort) {
            debugOpts = this.generateProxyContainerDebugOpts();
        }
        var opts = nested_object_assign_1.default({
            Env: this.generateProxyContainerEnv(),
            Image: imageName,
            name: containerName,
            User: '0:0'
        }, ioOpts, hostOpts, debugOpts);
        var encryptedOpts = lodash_1.default.cloneDeep(opts);
        if (encryptedOpts === null || encryptedOpts === void 0 ? void 0 : encryptedOpts.Env) {
            var encryptedEnv = encryptedOpts.Env.map(function (e) {
                if (e.startsWith("TUNNEL_SERVICE_AK_ID") || e.startsWith("TUNNEL_SERVICE_AK_SECRET")) {
                    var keyValueList = e.split('=');
                    var encrptedVal = utils_1.mark(keyValueList[1]);
                    return keyValueList[0] + "=" + encrptedVal;
                }
                else {
                    return e;
                }
            });
            encryptedOpts.Env = encryptedEnv;
        }
        logger_1.default.debug("Tunnel service proxy container options: " + JSON.stringify(encryptedOpts, null, '  '));
        return opts;
    };
    TunnelService.prototype.generateProxyContainerEnv = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var envs = {
            TUNNEL_SERVICE_HOST: TunnelService.tunnerServiceHost,
            TUNNEL_SERVICE_SESSION_ID: (_a = this.session) === null || _a === void 0 ? void 0 : _a.sessionId,
            TUNNEL_SERVICE_INSTANCE_ID: (_b = this.session) === null || _b === void 0 ? void 0 : _b.localInstanceId,
            TUNNEL_SERVICE_AK_ID: (_c = this.credentials) === null || _c === void 0 ? void 0 : _c.AccessKeyID,
            TUNNEL_SERVICE_AK_SECRET: (_d = this.credentials) === null || _d === void 0 ? void 0 : _d.AccessKeySecret,
        };
        if (runtime_1.isCustomContainerRuntime((_e = this.userFunctionConfig) === null || _e === void 0 ? void 0 : _e.runtime) || runtime_1.isCustomRuntime((_f = this.userFunctionConfig) === null || _f === void 0 ? void 0 : _f.runtime)) {
            Object.assign(envs, {
                FC_CA_PORT: ((_g = this.userFunctionConfig) === null || _g === void 0 ? void 0 : _g.caPort) || 9000
            });
        }
        return lodash_1.default.map(envs || {}, function (v, k) { return k + "=" + v; });
    };
    TunnelService.prototype.queryUntilSessionEstablished = function () {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var res, state, retryCnt;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.client.getSession((_a = this.session) === null || _a === void 0 ? void 0 : _a.sessionId)];
                    case 1:
                        res = _g.sent();
                        state = (_c = (_b = res === null || res === void 0 ? void 0 : res.body) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.status;
                        retryCnt = 0;
                        _g.label = 2;
                    case 2:
                        if (!(state !== 'ESTABLISHED' && retryCnt < TunnelService.maxRetryCnt)) return [3 /*break*/, 5];
                        return [4 /*yield*/, time_1.sleep(3000)];
                    case 3:
                        _g.sent();
                        return [4 /*yield*/, this.client.getSession((_d = this.session) === null || _d === void 0 ? void 0 : _d.sessionId)];
                    case 4:
                        res = _g.sent();
                        state = (_f = (_e = res === null || res === void 0 ? void 0 : res.body) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.status;
                        retryCnt = retryCnt + 1;
                        return [3 /*break*/, 2];
                    case 5:
                        if (state !== 'ESTABLISHED') {
                            throw new Error("Session establish fail, body in response is: " + JSON.stringify(res === null || res === void 0 ? void 0 : res.body, null, '  '));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.invokeHelperFunction = function (args) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var helperConfig, helperServiceConfig, helperFunctionConfig, fcRemoteInvokeComponent, inputs, fcRemoteInvokeComponentIns;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.checkIfProxyContainerRunning()];
                    case 1:
                        if (!!(_d.sent())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.clean()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, this.cleanFunctionContainer()];
                    case 3:
                        _d.sent();
                        throw new Error('Proxy container is not running, please run \'clean\' method and retry \'setup\' method.');
                    case 4: return [4 /*yield*/, state_1.getHelperConfigFromState((_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccountID, this.region, (_b = this.userServiceConfig) === null || _b === void 0 ? void 0 : _b.name, (_c = this.userFunctionConfig) === null || _c === void 0 ? void 0 : _c.name)];
                    case 5:
                        helperConfig = _d.sent();
                        helperServiceConfig = helperConfig === null || helperConfig === void 0 ? void 0 : helperConfig.service;
                        helperFunctionConfig = helperConfig === null || helperConfig === void 0 ? void 0 : helperConfig.function;
                        // const helperTriggerConfigList: TriggerConfig[] = helperConfig?.triggers;
                        logger_1.default.info("Invoking helper service: " + (helperServiceConfig === null || helperServiceConfig === void 0 ? void 0 : helperServiceConfig.name) + ", function: " + (helperFunctionConfig === null || helperFunctionConfig === void 0 ? void 0 : helperFunctionConfig.name) + " in region: " + this.region + " to make local function run.");
                        fcRemoteInvokeComponent = new fc_remote_invoke_1.FcRemoteInvokeComponent(this.region, helperServiceConfig === null || helperServiceConfig === void 0 ? void 0 : helperServiceConfig.name, this.access, this.appName, this.path, helperFunctionConfig === null || helperFunctionConfig === void 0 ? void 0 : helperFunctionConfig.name);
                        inputs = fcRemoteInvokeComponent.genComponentInputs('fc-remote-invoke', 'fc-remote-invoke-project', args, 'invoke', this.credentials, helperConfig.customDomains);
                        return [4 /*yield*/, core.loadComponent("devsapp/fc-remote-invoke")];
                    case 6:
                        fcRemoteInvokeComponentIns = _d.sent();
                        return [4 /*yield*/, fcRemoteInvokeComponentIns.invoke(inputs)];
                    case 7:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.checkIfProxyContainerRunning = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var proxyContainerId, runningContainers;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, state_1.getProxyContainerIdFromState((_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccountID, this.region, (_b = this.userServiceConfig) === null || _b === void 0 ? void 0 : _b.name, (_c = this.userFunctionConfig) === null || _c === void 0 ? void 0 : _c.name)];
                    case 1:
                        proxyContainerId = _d.sent();
                        if (!proxyContainerId) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, docker.listContainers()];
                    case 2:
                        runningContainers = (_d.sent()).map(function (container) { return container === null || container === void 0 ? void 0 : container.Id; });
                        if (runningContainers.includes(proxyContainerId)) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    TunnelService.prototype.clean = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function () {
            var helperConfig, session, proxyContainerId, helperServiceConfig, helperFunctionConfig, helperTriggerConfigList, c, e_9, unsetConfigVm, e_10, alicloudClient, _l, res, fcDeployComponent, fcDeployComponentIns, fcDeployComponentInputs, e_11, deleteSessionVm, e_12;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0: return [4 /*yield*/, state_1.getHelperConfigFromState((_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccountID, this.region, (_b = this.userServiceConfig) === null || _b === void 0 ? void 0 : _b.name, (_c = this.userFunctionConfig) === null || _c === void 0 ? void 0 : _c.name)];
                    case 1:
                        helperConfig = _m.sent();
                        return [4 /*yield*/, state_1.getSessionFromState((_d = this.credentials) === null || _d === void 0 ? void 0 : _d.AccountID, this.region, (_e = this.userServiceConfig) === null || _e === void 0 ? void 0 : _e.name, (_f = this.userFunctionConfig) === null || _f === void 0 ? void 0 : _f.name)];
                    case 2:
                        session = _m.sent();
                        return [4 /*yield*/, state_1.getProxyContainerIdFromState((_g = this.credentials) === null || _g === void 0 ? void 0 : _g.AccountID, this.region, (_h = this.userServiceConfig) === null || _h === void 0 ? void 0 : _h.name, (_j = this.userFunctionConfig) === null || _j === void 0 ? void 0 : _j.name)];
                    case 3:
                        proxyContainerId = _m.sent();
                        helperServiceConfig = helperConfig === null || helperConfig === void 0 ? void 0 : helperConfig.service;
                        helperFunctionConfig = helperConfig === null || helperConfig === void 0 ? void 0 : helperConfig.function;
                        helperTriggerConfigList = helperConfig === null || helperConfig === void 0 ? void 0 : helperConfig.triggers;
                        if (!proxyContainerId) return [3 /*break*/, 8];
                        _m.label = 4;
                    case 4:
                        _m.trys.push([4, 7, , 8]);
                        c = docker.getContainer(proxyContainerId);
                        return [4 /*yield*/, docker_1.stopContainer(c)];
                    case 5:
                        _m.sent();
                        return [4 /*yield*/, this.unsetProxyContainerId()];
                    case 6:
                        _m.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_9 = _m.sent();
                        logger_1.default.warning(stdout_formatter_1.default.stdoutFormatter.warn('stop proxy container', "containerId: " + proxyContainerId, e_9 === null || e_9 === void 0 ? void 0 : e_9.message));
                        logger_1.default.debug("Stop proxy container: " + proxyContainerId + " error: " + e_9);
                        return [3 /*break*/, 8];
                    case 8:
                        unsetConfigVm = core.spinner("Unsetting helper function config...");
                        _m.label = 9;
                    case 9:
                        _m.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.unsetHelperFunctionConfig(helperServiceConfig === null || helperServiceConfig === void 0 ? void 0 : helperServiceConfig.name, helperFunctionConfig === null || helperFunctionConfig === void 0 ? void 0 : helperFunctionConfig.name, 'LATEST')];
                    case 10:
                        _m.sent();
                        unsetConfigVm.succeed("Unset helper function provision and on-demand config done.");
                        return [3 /*break*/, 12];
                    case 11:
                        e_10 = _m.sent();
                        unsetConfigVm.fail("Unset error.");
                        logger_1.default.error(e_10 === null || e_10 === void 0 ? void 0 : e_10.message);
                        logger_1.default.debug("Error: " + e_10);
                        return [3 /*break*/, 12];
                    case 12:
                        if (!!this.fcClient) return [3 /*break*/, 14];
                        alicloudClient = new client_1.AlicloudClient(this.credentials);
                        _l = this;
                        return [4 /*yield*/, alicloudClient.getFcClient(this.region)];
                    case 13:
                        _l.fcClient = _m.sent();
                        _m.label = 14;
                    case 14: return [4 /*yield*/, this.fcClient.getProvisionConfig(helperServiceConfig.name, helperFunctionConfig.name, 'LATEST')];
                    case 15:
                        res = _m.sent();
                        _m.label = 16;
                    case 16:
                        if (!(!lodash_1.default.isNil(res.data) && ((_k = res.data) === null || _k === void 0 ? void 0 : _k.current) !== 0)) return [3 /*break*/, 19];
                        return [4 /*yield*/, time_1.sleep(1000)];
                    case 17:
                        _m.sent();
                        return [4 /*yield*/, this.fcClient.getProvisionConfig(helperServiceConfig.name, helperFunctionConfig.name, 'LATEST')];
                    case 18:
                        res = _m.sent();
                        return [3 /*break*/, 16];
                    case 19:
                        _m.trys.push([19, 22, , 23]);
                        fcDeployComponent = new fc_deploy_1.FcDeployComponent(this.region, helperServiceConfig, this.access, this.appName, this.path, helperFunctionConfig, helperTriggerConfigList);
                        return [4 /*yield*/, core.loadComponent("devsapp/fc-deploy")];
                    case 20:
                        fcDeployComponentIns = _m.sent();
                        fcDeployComponentInputs = fcDeployComponent.genComponentInputs('fc-deploy', 'fc-deploy-project', 'service -y', 'remove');
                        return [4 /*yield*/, fcDeployComponentIns.remove(fcDeployComponentInputs)];
                    case 21:
                        _m.sent();
                        return [3 /*break*/, 23];
                    case 22:
                        e_11 = _m.sent();
                        logger_1.default.warning(stdout_formatter_1.default.stdoutFormatter.warn('remove helper service', "serviceName: " + (helperServiceConfig === null || helperServiceConfig === void 0 ? void 0 : helperServiceConfig.name) + ", functionName: " + (helperFunctionConfig === null || helperFunctionConfig === void 0 ? void 0 : helperFunctionConfig.name), e_11 === null || e_11 === void 0 ? void 0 : e_11.message));
                        logger_1.default.debug("Error: " + e_11);
                        return [3 /*break*/, 23];
                    case 23:
                        deleteSessionVm = core.spinner("Deleting session: " + (session === null || session === void 0 ? void 0 : session.sessionId) + "...");
                        ;
                        _m.label = 24;
                    case 24:
                        _m.trys.push([24, 26, , 27]);
                        return [4 /*yield*/, this.deleteSession(session === null || session === void 0 ? void 0 : session.sessionId)];
                    case 25:
                        _m.sent();
                        deleteSessionVm.succeed("Delete session: " + (session === null || session === void 0 ? void 0 : session.sessionId) + " done.");
                        return [3 /*break*/, 27];
                    case 26:
                        e_12 = _m.sent();
                        deleteSessionVm.fail("Delete error.");
                        logger_1.default.error(e_12 === null || e_12 === void 0 ? void 0 : e_12.message);
                        logger_1.default.debug("Error: " + e_12);
                        return [3 /*break*/, 27];
                    case 27: return [2 /*return*/];
                }
            });
        });
    };
    TunnelService.prototype.getSession = function () {
        return this.session;
    };
    TunnelService.maxRetryCnt = 40;
    TunnelService.tunnerServiceHost = 'tunnel-service.cn-hangzhou.aliyuncs.com';
    // private static defaultFunctionImage: string = `registry.${TunnelService.defaultRegion}.aliyuncs.com/aliyunfc/ts-remote:v0.2`;
    TunnelService.proxyImageName = 'ts-local';
    TunnelService.proxyImageStableVersion = 'v0.1.1';
    TunnelService.helperImageStableVersion = 'v0.1.2';
    TunnelService.helperImageVersion = process.env['TUNNEL_SERVICE_HELPER_IMAGE_LATEST_VERSION'] || TunnelService.helperImageStableVersion;
    TunnelService.proxyImageVersion = process.env['TUNNEL_SERVICE_PROXY_IMAGE_LATEST_VERSION'] || TunnelService.proxyImageStableVersion;
    TunnelService.proxyImageRepo = 'aliyunfc';
    TunnelService.proxyImaggeRegistry = 'registry.cn-hangzhou.aliyuncs.com';
    TunnelService.cacheDirPath = path.join(os.homedir(), '.s', 'cache', 'fc-tunnel-invoke');
    TunnelService.runtimeListNeedSetTsAdjustFLag = ['nodejs', 'python', 'php', 'java'];
    return TunnelService;
}());
exports.default = TunnelService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHVubmVsLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3R1bm5lbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUFzQztBQUN0QywwREFBOEM7QUFHOUMsMENBQStDO0FBRy9DLGtEQUF1QjtBQUN2Qiw0Q0FBZ0M7QUFDaEMsbURBQXdEO0FBQ3hELHFDQUFxQztBQUNyQywwQ0FBNkU7QUFDN0UsOEVBQXNEO0FBQ3RELHVDQUFtQztBQUNuQyx5Q0FBNkI7QUFDN0IscUNBQXlCO0FBQ3pCLDRDQUFnQztBQUVoQywyRUFPMEM7QUFDMUMsNEZBQXNEO0FBRXRELDJDQUFtRTtBQUNuRSwyQ0FBMEM7QUFDMUMseUNBQTBEO0FBRTFELGlFQUFxRTtBQUNyRSxxQ0FBMEQ7QUFDMUQsd0RBQStCO0FBQy9CLDJDQUEwRTtBQUMxRSxrRkFBMkQ7QUFDM0QscURBQStEO0FBQy9ELGlDQUFxQztBQUNyQyx1Q0FBbUs7QUFDbkssNkNBQW1EO0FBQ25ELDBDQUFnRDtBQUNoRCxtQ0FBd0Q7QUFFeEQsSUFBTSxNQUFNLEdBQVEsSUFBSSxtQkFBTSxFQUFFLENBQUM7QUFDakMsSUFBTSxXQUFXLEdBQVcsU0FBUyxDQUFDO0FBRXRDO0lBb0NJLHVCQUFZLFdBQXlCLEVBQUUsaUJBQWdDLEVBQUUsa0JBQWtDLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxPQUFlLEVBQUUsSUFBUyxFQUFFLHFCQUF1QyxFQUFFLDBCQUFpRCxFQUFFLFNBQWtCLEVBQUUsUUFBaUIsRUFBRSxVQUFtQixFQUFFLFNBQW1CO1FBQXBWLGlCQW9EQzs7UUFuREcsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxrQkFB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