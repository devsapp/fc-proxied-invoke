'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var node_watch_1 = __importDefault(require("node-watch"));
var rimraf = __importStar(require("rimraf"));
var ignore_1 = require("../ignore");
var invoke_1 = __importDefault(require("./invoke"));
var docker = __importStar(require("../../docker/docker"));
var dockerOpts = __importStar(require("../../docker/docker-opts"));
var dockerode_1 = __importDefault(require("dockerode"));
var runtime_1 = require("../../utils/runtime");
var logger_1 = __importDefault(require("../../../common/logger"));
var definition_1 = require("../../definition");
var time_1 = require("../../utils/time");
var process_1 = require("../../utils/process");
var devs_1 = require("../../utils/devs");
var lodash_1 = __importDefault(require("lodash"));
var retry_1 = require("../../retry");
var core = __importStar(require("@serverless-devs/core"));
var stdout_formatter_1 = __importDefault(require("../../component/stdout-formatter"));
var state_1 = require("../../utils/state");
var dev_null_1 = __importDefault(require("dev-null"));
var nas_1 = require("../nas");
var prompt_1 = require("../../prompt");
var dockerClient = new dockerode_1.default();
var HttpInvoke = /** @class */ (function (_super) {
    __extends(HttpInvoke, _super);
    function HttpInvoke(tunnelService, sessionId, creds, region, baseDir, serviceConfig, functionConfig, triggerConfig, debugPort, debugIde, tmpDir, debuggerPath, debugArgs, nasBaseDir, assumeYes) {
        var _this = _super.call(this, tunnelService, sessionId, creds, region, baseDir, serviceConfig, functionConfig, triggerConfig, debugPort, debugIde, tmpDir, debuggerPath, debugArgs, nasBaseDir) || this;
        _this.assumeYes = assumeYes;
        process_1.setSigint();
        // exit container, when use ctrl + c
        process.on('SIGINT', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cancelExecAndCleanAll()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return _this;
    }
    HttpInvoke.prototype._disableRunner = function (evt, name) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var oldRunner, tmpCodeDir, stopVm, e_1, killVm, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.runner) {
                            return [2 /*return*/];
                        }
                        logger_1.default.info("Detect code changes, file is " + name + ", event is " + evt + ", auto reloading...");
                        oldRunner = this.runner;
                        tmpCodeDir = this.unzippedCodeDir;
                        this.runner = null;
                        // this.containerName = docker.generateRamdomContainerName();
                        return [4 /*yield*/, this.init()];
                    case 1:
                        // this.containerName = docker.generateRamdomContainerName();
                        _b.sent();
                        return [4 /*yield*/, time_1.sleep(500)];
                    case 2:
                        _b.sent();
                        stopVm = core.spinner('Reloading success, stopping old function container...');
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 10]);
                        return [4 /*yield*/, oldRunner.stop()];
                    case 4:
                        _b.sent();
                        stopVm.succeed('Stop old function container successfully');
                        return [3 /*break*/, 10];
                    case 5:
                        e_1 = _b.sent();
                        stopVm.fail("Stop function container failed.");
                        logger_1.default.debug("Stop function container failed, error: " + e_1);
                        killVm = core.spinner('Killing old container...');
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, oldRunner.kill()];
                    case 7:
                        _b.sent();
                        killVm.succeed('Kill old container successfully');
                        return [3 /*break*/, 9];
                    case 8:
                        e_2 = _b.sent();
                        killVm.fail('Kill old container failed, please kill it manually.');
                        logger_1.default.debug("Kill function container failed, error: " + e_2);
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 10];
                    case 10: return [4 /*yield*/, state_1.unsetInvokeContainerId((_a = this.creds) === null || _a === void 0 ? void 0 : _a.AccountID, this.region, this.serviceName, this.functionName)];
                    case 11:
                        _b.sent();
                        if (tmpCodeDir) {
                            rimraf.sync(tmpCodeDir);
                            logger_1.default.info("Clean tmp code dir " + tmpCodeDir + " successfully.\n");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpInvoke.prototype._startRunner = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, envs, cmd, proxyContainerName, limitedHostConfig, fcCommon, err_1, opts, _e, isDebug, nasCmds, nasMountTasks_1;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _d = this.tunnelService;
                        if (!_d) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tunnelService.checkIfProxyContainerRunning()];
                    case 1:
                        _d = !(_f.sent());
                        _f.label = 2;
                    case 2:
                        if (!_d) return [3 /*break*/, 5];
                        console.log();
                        logger_1.default.error('\nFunction container starts failed.Start cleaning now.');
                        if (!this.tunnelService) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.tunnelService.clean()];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4: throw new Error("Function container starts failed because proxy container is not running, please retry 'setup' method.");
                    case 5: return [4 /*yield*/, docker.generateDockerEnvs(this.creds, this.region, this.baseDir, this.serviceName, this.serviceConfig, this.functionName, this.functionConfig, this.debugPort, null, this.nasConfig, this.debugIde, this.debugArgs)];
                    case 6:
                        envs = _f.sent();
                        cmd = docker.generateDockerCmd(this.runtime, true, this.functionConfig);
                        proxyContainerName = definition_1.genProxyContainerName(this.sessionId);
                        this.containerName = docker.generateRamdomContainerName();
                        _f.label = 7;
                    case 7:
                        _f.trys.push([7, 10, , 11]);
                        return [4 /*yield*/, core.loadComponent('devsapp/fc-common')];
                    case 8:
                        fcCommon = _f.sent();
                        return [4 /*yield*/, fcCommon.genContainerResourcesLimitConfig(this.functionConfig.memorySize)];
                    case 9:
                        limitedHostConfig = _f.sent();
                        logger_1.default.debug(JSON.stringify(limitedHostConfig));
                        return [3 /*break*/, 11];
                    case 10:
                        err_1 = _f.sent();
                        logger_1.default.debug(err_1);
                        logger_1.default.warning("Try to generate the container's resource limit configuration bug failed. The default configuration of docker will be used.");
                        limitedHostConfig = {
                            CpuPeriod: null,
                            CpuQuota: null,
                            Memory: null,
                            Ulimits: null,
                        };
                        return [3 /*break*/, 11];
                    case 11: return [4 /*yield*/, dockerOpts.generateLocalStartOpts(proxyContainerName, this.runtime, this.containerName, this.mounts, cmd, envs, limitedHostConfig, {
                            debugPort: this.debugPort,
                            dockerUser: this.dockerUser,
                            imageName: this.imageName,
                        })];
                    case 12:
                        opts = _f.sent();
                        // runner 失败了
                        _e = this;
                        return [4 /*yield*/, docker.startContainer(opts, process.stdout, process.stderr, {
                                serviceName: this.serviceName,
                                functionName: this.functionName,
                            })];
                    case 13:
                        // runner 失败了
                        _e.runner = _f.sent();
                        return [4 /*yield*/, this.saveInvokeContainerId()];
                    case 14:
                        _f.sent();
                        isDebug = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.temp_params) === null || _b === void 0 ? void 0 : _b.includes('--debug');
                        if (!!runtime_1.isCustomContainerRuntime((_c = this.functionConfig) === null || _c === void 0 ? void 0 : _c.runtime)) return [3 /*break*/, 16];
                        logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.check('server in function container', 'is up.'));
                        return [4 /*yield*/, retry_1.promiseRetry(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var caPort, res, ex_1;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 3, , 4]);
                                            if (!this.runner) {
                                                throw new Error('Function container is closed, exit!');
                                            }
                                            return [4 /*yield*/, time_1.sleep(1000)];
                                        case 1:
                                            _b.sent();
                                            caPort = ((_a = this.functionConfig) === null || _a === void 0 ? void 0 : _a.caPort) || 9000;
                                            return [4 /*yield*/, this.runner.exec(['bash', '-c', "</dev/tcp/127.0.0.1/" + caPort], {
                                                    outputStream: isDebug ? process.stdout : dev_null_1.default(),
                                                    errorStream: isDebug ? process.stderr : dev_null_1.default(),
                                                })];
                                        case 2:
                                            res = _b.sent();
                                            if (res === 0) {
                                                logger_1.default.info("Server in function container is up!");
                                                return [2 /*return*/];
                                            }
                                            logger_1.default.debug("Server is not up. Result is :" + res);
                                            logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.retry('checking server in function container', 'is up', '', times));
                                            retry(res);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            ex_1 = _b.sent();
                                            if (ex_1.message === 'Function container is closed, exit!') {
                                                throw ex_1;
                                            }
                                            logger_1.default.debug("Checking server in function container failed, error: " + ex_1);
                                            logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.retry('checking server in function container', 'is up', '', times));
                                            retry(ex_1);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }, 20)];
                    case 15:
                        _f.sent();
                        _f.label = 16;
                    case 16:
                        nasCmds = nas_1.convertNasConfigToMountCmd(this.nasConfig);
                        if (!!lodash_1.default.isEmpty(nasCmds)) return [3 /*break*/, 18];
                        logger_1.default.info('Attempting to mount nas...');
                        nasMountTasks_1 = nasCmds.map(function (nasCmd) {
                            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var mountRes, error_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.runner.exec(nasCmd)];
                                        case 1:
                                            mountRes = _a.sent();
                                            resolve(mountRes);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            error_1 = _a.sent();
                                            logger_1.default.debug("Mount failed, command is : " + nasCmd + ", result is: " + error_1);
                                            reject(error_1);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                        });
                        return [4 /*yield*/, retry_1.promiseRetry(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.all(nasMountTasks_1)
                                                .then(function (allNasMountRes) {
                                                logger_1.default.debug("Nas mount results: " + allNasMountRes);
                                                logger_1.default.info('NAS has been mounted successfully！');
                                                return true;
                                            })
                                                .catch(function (mountNasError) {
                                                logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.retry('check the NAS', 'is mounted', '', times));
                                                retry(mountNasError);
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .then(function () {
                                return;
                            })
                                .catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
                                var isContinue, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            logger_1.default.warning('Mount nas failed.');
                                            logger_1.default.debug("Mount nas failed, error is " + err);
                                            logger_1.default.info("Please confirm the following items in s.yaml:\n- VPC has been configured correctly\n- NAS has been configured correctly\n- The NAS mount point is a private network type and is under the same VPC as the configuration\n- The NAS source directory exists\nFor more information about s.yaml configuration, please refer to: https://github.com/devsapp/fc/blob/main/docs/Others/yaml.md");
                                            _a = this.assumeYes;
                                            if (_a) return [3 /*break*/, 2];
                                            return [4 /*yield*/, prompt_1.isContinueWhenNasMountError()];
                                        case 1:
                                            _a = (_b.sent());
                                            _b.label = 2;
                                        case 2:
                                            isContinue = _a;
                                            if (!!isContinue) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.cancelExecAndCleanAll()];
                                        case 3:
                                            _b.sent();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            logger_1.default.info('The container was started successfully in local mount nas mode!');
                                            _b.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 17:
                        _f.sent();
                        _f.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    HttpInvoke.prototype.saveInvokeContainerId = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, devs_1.setKVInState('invokeContainerId', (_a = this.runner) === null || _a === void 0 ? void 0 : _a.containerId, state_1.genStateId((_b = this.creds) === null || _b === void 0 ? void 0 : _b.AccountID, this.region, this.serviceName, this.functionName))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpInvoke.prototype.initWatch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ign_1, stopMutex_1, startMutex_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.watcher && !runtime_1.isCustomContainerRuntime(this.runtime))) return [3 /*break*/, 2];
                        return [4 /*yield*/, ignore_1.isIgnored(this.baseDir)];
                    case 1:
                        ign_1 = _a.sent();
                        stopMutex_1 = false;
                        startMutex_1 = false;
                        this.watcher = node_watch_1.default(this.codeUri, {
                            recursive: true,
                            persistent: false,
                            filter: function (f) {
                                return ign_1 && !ign_1(f);
                            },
                        }, function (evt, name) { return __awaiter(_this, void 0, void 0, function () {
                            var maxStartMutexOccupiedTime, startMutexOccupiedTime, e_3;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (stopMutex_1) {
                                            return [2 /*return*/];
                                        }
                                        maxStartMutexOccupiedTime = 300;
                                        startMutexOccupiedTime = 0;
                                        if (!startMutex_1) return [3 /*break*/, 7];
                                        _a.label = 1;
                                    case 1:
                                        if (!startMutex_1) return [3 /*break*/, 7];
                                        // TODO: 设置等待时间上限
                                        if (stopMutex_1) {
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, time_1.sleep(3000)];
                                    case 2:
                                        _a.sent();
                                        startMutexOccupiedTime = startMutexOccupiedTime + 3;
                                        if (!(startMutexOccupiedTime > maxStartMutexOccupiedTime)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, this.clean()];
                                    case 3:
                                        _a.sent();
                                        if (!this.tunnelService) return [3 /*break*/, 5];
                                        return [4 /*yield*/, this.tunnelService.clean()];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: throw new Error("Restart function container timeout after 300s!Please check if docker runs normally, then runs 'clean' method and try 'setup' again.");
                                    case 6: return [3 /*break*/, 1];
                                    case 7:
                                        stopMutex_1 = true;
                                        _a.label = 8;
                                    case 8:
                                        _a.trys.push([8, 12, , 13]);
                                        if (!this.runner) return [3 /*break*/, 10];
                                        return [4 /*yield*/, this._disableRunner(evt, name)];
                                    case 9:
                                        _a.sent();
                                        return [3 /*break*/, 11];
                                    case 10:
                                        logger_1.default.debug('detect code changes, but no runner found, starting....');
                                        _a.label = 11;
                                    case 11: return [3 /*break*/, 13];
                                    case 12:
                                        e_3 = _a.sent();
                                        logger_1.default.warning("Stop function container failed, please stop it manually.");
                                        logger_1.default.debug("Stop function container error: " + e_3);
                                        return [3 /*break*/, 13];
                                    case 13:
                                        startMutex_1 = true;
                                        stopMutex_1 = false;
                                        logger_1.default.info('Detecting code changes and Restarting funtion container...');
                                        return [4 /*yield*/, retry_1.promiseRetry(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                                var ex_2;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 2, , 4]);
                                                            return [4 /*yield*/, this._startRunner()];
                                                        case 1:
                                                            _a.sent();
                                                            logger_1.default.info("Restart function container succeed! Please try 'invoke' again.");
                                                            return [2 /*return*/];
                                                        case 2:
                                                            ex_2 = _a.sent();
                                                            logger_1.default.error('Restart function container failed!');
                                                            if (ex_2 === null || ex_2 === void 0 ? void 0 : ex_2.message.includes('Function container starts failed because proxy container is not running')) {
                                                                throw ex_2;
                                                            }
                                                            logger_1.default.debug("Restart function container failed, error is: \n" + ex_2);
                                                            logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.retry('function container', 'restart', '', times));
                                                            return [4 /*yield*/, time_1.sleep(100)];
                                                        case 3:
                                                            _a.sent();
                                                            retry(ex_2);
                                                            return [3 /*break*/, 4];
                                                        case 4: return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 14:
                                        _a.sent();
                                        startMutex_1 = false;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.watcher.on('error', function (err) {
                            throw err;
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    HttpInvoke.prototype.initAndStartRunner = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._startRunner()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.initWatch()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.setDebugIdeConfig()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpInvoke.prototype.clean = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var invokeContainerId, container;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, state_1.getInvokeContainerIdFromState((_a = this.creds) === null || _a === void 0 ? void 0 : _a.AccountID, this.region, this.serviceName, this.functionName)];
                    case 1:
                        invokeContainerId = _c.sent();
                        return [4 /*yield*/, dockerClient.getContainer(invokeContainerId)];
                    case 2:
                        container = _c.sent();
                        return [4 /*yield*/, docker.stopContainer(container)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, state_1.unsetInvokeContainerId((_b = this.creds) === null || _b === void 0 ? void 0 : _b.AccountID, this.region, this.serviceName, this.functionName)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpInvoke.prototype.cancelExecAndCleanAll = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var stopVm, e_4, killVm, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.watcher) {
                            this.watcher.close();
                        }
                        this.cleanUnzippedCodeDir();
                        if (!this.runner) return [3 /*break*/, 10];
                        stopVm = core.spinner('Received canncel request, stopping running function container...');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, this.runner.stop()];
                    case 2:
                        _b.sent();
                        stopVm.succeed('Stop function container successfully');
                        return [3 /*break*/, 8];
                    case 3:
                        e_4 = _b.sent();
                        stopVm.fail('Stop function container failed.');
                        logger_1.default.debug("Stop function container failed, error: " + e_4);
                        killVm = core.spinner('Killing old container...');
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.runner.kill()];
                    case 5:
                        _b.sent();
                        killVm.succeed('Kill function container successfully');
                        return [3 /*break*/, 7];
                    case 6:
                        e_5 = _b.sent();
                        killVm.fail('Kill old container failed, please kill it manually.');
                        logger_1.default.debug("Kill function container failed, error: " + e_5);
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [4 /*yield*/, state_1.unsetInvokeContainerId((_a = this.creds) === null || _a === void 0 ? void 0 : _a.AccountID, this.region, this.serviceName, this.functionName)];
                    case 9:
                        _b.sent();
                        this.runner = null;
                        _b.label = 10;
                    case 10:
                        if (!this.tunnelService) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.tunnelService.clean()];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        // 修复 windows 环境下 Ctrl C 后容器退出，但是程序会 block 住的问题
                        if (process.platform === 'win32') {
                            process.exit(0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return HttpInvoke;
}(invoke_1.default));
exports.default = HttpInvoke;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1pbnZva2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvY2FsLWludm9rZS9pbnZva2UvaHR0cC1pbnZva2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWIsMERBQStCO0FBSy9CLDZDQUFpQztBQUNqQyxvQ0FBZ0Q7QUFDaEQsb0RBQThCO0FBQzlCLDBEQUE4QztBQUM5QyxtRUFBdUQ7QUFDdkQsd0RBQStCO0FBRS9CLCtDQUErRDtBQUMvRCxrRUFBNEM7QUFFNUMsK0NBQXlEO0FBQ3pELHlDQUF5QztBQUN6QywrQ0FBZ0Q7QUFDaEQseUNBQWdEO0FBQ2hELGtEQUF1QjtBQUN2QixxQ0FBMkM7QUFDM0MsMERBQThDO0FBQzlDLHNGQUErRDtBQUUvRCwyQ0FBc0c7QUFDdEcsc0RBQStCO0FBQy9CLDhCQUFvRDtBQUNwRCx1Q0FBMkQ7QUFFM0QsSUFBTSxZQUFZLEdBQVEsSUFBSSxtQkFBTSxFQUFFLENBQUM7QUFFdkM7SUFBd0MsOEJBQU07SUFLNUMsb0JBQ0UsYUFBNEIsRUFDNUIsU0FBaUIsRUFDakIsS0FBbUIsRUFDbkIsTUFBYyxFQUNkLE9BQWUsRUFDZixhQUE0QixFQUM1QixjQUE4QixFQUM5QixhQUE2QixFQUM3QixTQUFrQixFQUNsQixRQUFjLEVBQ2QsTUFBZSxFQUNmLFlBQWtCLEVBQ2xCLFNBQWUsRUFDZixVQUFtQixFQUNuQixTQUFtQjtRQWZyQixZQWlCRSxrQkFDRSxhQUFhLEVBQ2IsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLFNBQVMsRUFDVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxDQUNYLFNB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