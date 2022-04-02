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
exports.stopContainer = exports.startContainer = exports.showDebugIdeTipsForPycharm = exports.writeDebugIdeConfigForVscode = exports.resolvePasswdMount = exports.resolveDebuggerPathToMount = exports.resolveTmpDirToMount = exports.resolveNasConfigToMounts = exports.isDockerToolBoxAndEnsureDockerVersion = exports.resolveCodeUriToMount = exports.runContainer = exports.generateDockerEnvs = exports.generateDockerCmd = exports.pullImageIfNeed = exports.generateRamdomContainerName = void 0;
var core = __importStar(require("@serverless-devs/core"));
var dockerode_1 = __importDefault(require("dockerode"));
var logger_1 = __importDefault(require("../../common/logger"));
var docker_support_1 = require("./docker-support");
var error_processor_1 = require("../error-processor");
var lodash_1 = __importDefault(require("lodash"));
var nas = __importStar(require("../local-invoke/nas"));
var path_1 = __importDefault(require("path"));
var devs_1 = require("../devs");
var fs = __importStar(require("fs-extra"));
var passwd_1 = require("../utils/passwd");
var dockerOpts = __importStar(require("./docker-opts"));
var debug_1 = require("../local-invoke/debug");
var ip = __importStar(require("ip"));
var env_1 = require("../local-invoke/env");
var runtime_1 = require("../utils/runtime");
var definition_1 = require("../definition");
var dev_null_1 = __importDefault(require("dev-null"));
var isWin = process.platform === 'win32';
var docker = new dockerode_1.default();
var containers = new Set();
var streams = new Set();
function generateRamdomContainerName() {
    return "fc_local_" + new Date().getTime() + "_" + Math.random().toString(36).substr(2, 7);
}
exports.generateRamdomContainerName = generateRamdomContainerName;
function pullImageIfNeed(imageUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var fcCore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-core')];
                case 1:
                    fcCore = _a.sent();
                    return [4 /*yield*/, fcCore.pullImageIfNeed(docker, imageUrl)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.pullImageIfNeed = pullImageIfNeed;
function generateDockerCmd(runtime, isLocalStartInit, functionConfig, httpMode, invokeInitializer, event) {
    if (invokeInitializer === void 0) { invokeInitializer = true; }
    if (event === void 0) { event = null; }
    if (runtime_1.isCustomContainerRuntime(runtime)) {
        return genDockerCmdOfCustomContainer(functionConfig);
    }
    else if (isLocalStartInit) {
        return ['--server'];
    }
    return genDockerCmdOfNonCustomContainer(functionConfig, httpMode, invokeInitializer, event);
}
exports.generateDockerCmd = generateDockerCmd;
function genDockerCmdOfNonCustomContainer(functionConfig, httpMode, invokeInitializer, event) {
    if (invokeInitializer === void 0) { invokeInitializer = true; }
    if (event === void 0) { event = null; }
    var cmd = ['-h', functionConfig.handler];
    // 如果提供了 event
    if (event !== null) {
        cmd.push('--event', Buffer.from(event).toString('base64'));
        cmd.push('--event-decode');
    }
    else {
        // always pass event using stdin mode
        cmd.push('--stdin');
    }
    if (httpMode) {
        cmd.push('--http');
    }
    var initializer = functionConfig.initializer;
    if (initializer && invokeInitializer) {
        cmd.push('-i', initializer);
    }
    var initializationTimeout = functionConfig.initializationTimeout;
    // initializationTimeout is defined as integer, see lib/validate/schema/function.js
    if (initializationTimeout) {
        cmd.push('--initializationTimeout', initializationTimeout.toString());
    }
    logger_1.default.debug("docker cmd: " + cmd);
    return cmd;
}
function genDockerCmdOfCustomContainer(functionConfig) {
    var command = functionConfig.customContainerConfig.command ? JSON.parse(functionConfig.customContainerConfig.command) : undefined;
    var args = functionConfig.customContainerConfig.args ? JSON.parse(functionConfig.customContainerConfig.args) : undefined;
    if (command && args) {
        return __spreadArrays(command, args);
    }
    else if (command) {
        return command;
    }
    else if (args) {
        return args;
    }
    return [];
}
function generateDockerEnvs(creds, region, baseDir, serviceName, serviceProps, functionName, functionProps, debugPort, httpParams, nasConfig, debugIde, debugArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var envs, confEnv, runtime, debugEnv, logConfigInEnv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    envs = {};
                    if (httpParams) {
                        Object.assign(envs, {
                            FC_HTTP_PARAMS: httpParams,
                        });
                    }
                    return [4 /*yield*/, env_1.resolveLibPathsFromLdConf(baseDir, functionProps.codeUri)];
                case 1:
                    confEnv = _a.sent();
                    Object.assign(envs, confEnv);
                    runtime = functionProps.runtime;
                    if (debugPort && !debugArgs) {
                        debugEnv = debug_1.generateDebugEnv(runtime, debugPort, debugIde);
                        Object.assign(envs, debugEnv);
                    }
                    else if (debugArgs) {
                        Object.assign(envs, {
                            DEBUG_OPTIONS: debugArgs,
                        });
                    }
                    Object.assign(envs, generateFunctionEnvs(functionProps));
                    if (definition_1.isAutoConfig(serviceProps === null || serviceProps === void 0 ? void 0 : serviceProps.logConfig)) {
                        logConfigInEnv = definition_1.resolveAutoLogConfig(creds === null || creds === void 0 ? void 0 : creds.AccountID, region, serviceName);
                    }
                    else {
                        // @ts-ignore
                        logConfigInEnv = serviceProps === null || serviceProps === void 0 ? void 0 : serviceProps.logConfig;
                    }
                    if (functionProps === null || functionProps === void 0 ? void 0 : functionProps.runtime.includes('java')) {
                        Object.assign(envs, { fc_enable_new_java_ca: true });
                    }
                    Object.assign(envs, {
                        local: true,
                        FC_ACCESS_KEY_ID: creds === null || creds === void 0 ? void 0 : creds.AccessKeyID,
                        FC_ACCESS_KEY_SECRET: creds === null || creds === void 0 ? void 0 : creds.AccessKeySecret,
                        FC_SECURITY_TOKEN: creds === null || creds === void 0 ? void 0 : creds.SecurityToken,
                        FC_ACCOUNT_ID: creds === null || creds === void 0 ? void 0 : creds.AccountID,
                        FC_REGION: region,
                        FC_FUNCTION_NAME: functionName,
                        FC_HANDLER: functionProps.handler,
                        FC_MEMORY_SIZE: functionProps.memorySize || 128,
                        FC_TIMEOUT: functionProps.timeout || 3,
                        FC_INITIALIZER: functionProps.initializer,
                        FC_INITIALIZATION_TIMEOUT: functionProps.initializationTimeout || 3,
                        FC_SERVICE_NAME: serviceName,
                        FC_SERVICE_LOG_PROJECT: logConfigInEnv === null || logConfigInEnv === void 0 ? void 0 : logConfigInEnv.project,
                        FC_SERVICE_LOG_STORE: logConfigInEnv === null || logConfigInEnv === void 0 ? void 0 : logConfigInEnv.logstore,
                    });
                    if (runtime_1.isCustomContainerRuntime(functionProps.runtime)) {
                        return [2 /*return*/, envs];
                    }
                    return [2 /*return*/, env_1.addEnv(envs, nasConfig)];
            }
        });
    });
}
exports.generateDockerEnvs = generateDockerEnvs;
function generateFunctionEnvs(functionConfig) {
    var environmentVariables = functionConfig.environmentVariables;
    if (!environmentVariables) {
        return {};
    }
    return Object.assign({}, environmentVariables);
}
function runContainer(opts, outputStream, errorStream, context) {
    return __awaiter(this, void 0, void 0, function () {
        var container, attachOpts, stream, errorTransform, logStream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createContainer(opts)];
                case 1:
                    container = _a.sent();
                    attachOpts = {
                        hijack: true,
                        stream: true,
                        stdin: true,
                        stdout: true,
                        stderr: true,
                    };
                    return [4 /*yield*/, container.attach(attachOpts)];
                case 2:
                    stream = _a.sent();
                    if (!outputStream) {
                        outputStream = process.stdout;
                    }
                    if (!errorStream) {
                        errorStream = process.stderr;
                    }
                    errorTransform = error_processor_1.processorTransformFactory({
                        serviceName: context === null || context === void 0 ? void 0 : context.serviceName,
                        functionName: context === null || context === void 0 ? void 0 : context.functionName,
                        errorStream: errorStream,
                    });
                    if (!isWin) {
                        container.modem.demuxStream(stream, outputStream, errorTransform);
                    }
                    return [4 /*yield*/, container.start()];
                case 3:
                    _a.sent();
                    if (!isWin) return [3 /*break*/, 5];
                    return [4 /*yield*/, container.logs({
                            stdout: true,
                            stderr: true,
                            follow: true,
                        })];
                case 4:
                    logStream = _a.sent();
                    container.modem.demuxStream(logStream, outputStream, errorTransform);
                    _a.label = 5;
                case 5:
                    containers.add(container.id);
                    streams.add(stream);
                    return [2 /*return*/, {
                            container: container,
                            stream: stream,
                        }];
            }
        });
    });
}
exports.runContainer = runContainer;
// todo: 当前只支持目录以及 jar。code uri 还可能是 oss 地址、目录、jar、zip?
function resolveCodeUriToMount(absCodeUri, readOnly) {
    if (readOnly === void 0) { readOnly = true; }
    return __awaiter(this, void 0, void 0, function () {
        var target, stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!absCodeUri) {
                        return [2 /*return*/, null];
                    }
                    target = null;
                    return [4 /*yield*/, fs.lstat(absCodeUri)];
                case 1:
                    stats = _a.sent();
                    if (stats.isDirectory()) {
                        target = '/code';
                    }
                    else {
                        // could not use path.join('/code', xxx)
                        // in windows, it will be translate to \code\xxx, and will not be recorgnized as a valid path in linux container
                        target = path_1.default.posix.join('/code', path_1.default.basename(absCodeUri));
                    }
                    // Mount the code directory as read only
                    return [2 /*return*/, {
                            Type: 'bind',
                            Source: absCodeUri,
                            Target: target,
                            ReadOnly: readOnly,
                        }];
            }
        });
    });
}
exports.resolveCodeUriToMount = resolveCodeUriToMount;
function isDockerToolBoxAndEnsureDockerVersion() {
    return __awaiter(this, void 0, void 0, function () {
        var dockerInfo, obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, docker.info()];
                case 1:
                    dockerInfo = _a.sent();
                    return [4 /*yield*/, detectDockerVersion(dockerInfo.ServerVersion || '')];
                case 2:
                    _a.sent();
                    obj = (dockerInfo.Labels || [])
                        .map(function (e) { return lodash_1.default.split(e, '=', 2); })
                        .filter(function (e) { return e.length === 2; })
                        .reduce(function (acc, cur) { return ((acc[cur[0]] = cur[1]), acc); }, {});
                    return [2 /*return*/, process.platform === 'win32' && obj.provider === 'virtualbox'];
            }
        });
    });
}
exports.isDockerToolBoxAndEnsureDockerVersion = isDockerToolBoxAndEnsureDockerVersion;
function detectDockerVersion(serverVersion) {
    return __awaiter(this, void 0, void 0, function () {
        var cur;
        return __generator(this, function (_a) {
            cur = serverVersion.split('.');
            // 1.13.1
            if (Number.parseInt(cur[0]) === 1 && Number.parseInt(cur[1]) <= 13) {
                throw new Error("\nWe detected that your docker version is " + serverVersion + ", for a better experience, please upgrade the docker version.");
            }
            return [2 /*return*/];
        });
    });
}
function createContainer(opts) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var isWin, isMac, pathsOutofSharedPaths, dockerToolBox, container, ex_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    isWin = process.platform === 'win32';
                    isMac = process.platform === 'darwin';
                    if (!(opts && isMac)) return [3 /*break*/, 2];
                    if (!opts.HostConfig) return [3 /*break*/, 2];
                    return [4 /*yield*/, docker_support_1.findPathsOutofSharedPaths((_a = opts.HostConfig) === null || _a === void 0 ? void 0 : _a.Mounts)];
                case 1:
                    pathsOutofSharedPaths = _b.sent();
                    if (isMac && pathsOutofSharedPaths.length > 0) {
                        throw new Error("Please add directory '" + pathsOutofSharedPaths + "' to Docker File sharing list, more information please refer to https://github.com/alibaba/funcraft/blob/master/docs/usage/faq-zh.md");
                    }
                    _b.label = 2;
                case 2: return [4 /*yield*/, isDockerToolBoxAndEnsureDockerVersion()];
                case 3:
                    dockerToolBox = _b.sent();
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, docker.createContainer(opts)];
                case 5:
                    // see https://github.com/apocas/dockerode/pull/38
                    container = _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    ex_1 = _b.sent();
                    if (ex_1.message.indexOf('invalid mount config for type') !== -1 && dockerToolBox) {
                        throw new Error("The default host machine path for docker toolbox is under 'C:\\Users', Please make sure your project is in this directory. If you want to mount other disk paths, please refer to https://github.com/alibaba/funcraft/blob/master/docs/usage/faq-zh.md .");
                    }
                    if (ex_1.message.indexOf('drive is not shared') !== -1 && isWin) {
                        throw new Error(ex_1.message + "More information please refer to https://docs.docker.com/docker-for-windows/#shared-drives");
                    }
                    throw ex_1;
                case 7: return [2 /*return*/, container];
            }
        });
    });
}
function resolveNasConfigToMounts(baseDir, serviceName, nasConfig, nasBaseDir) {
    return __awaiter(this, void 0, void 0, function () {
        var nasMappings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nas.convertNasConfigToNasMappings(nasBaseDir, nasConfig, serviceName)];
                case 1:
                    nasMappings = _a.sent();
                    return [2 /*return*/, convertNasMappingsToMounts(devs_1.getRootBaseDir(baseDir), nasMappings)];
            }
        });
    });
}
exports.resolveNasConfigToMounts = resolveNasConfigToMounts;
function convertNasMappingsToMounts(baseDir, nasMappings) {
    return nasMappings.map(function (nasMapping) {
        // console.log('mounting local nas mock dir %s into container %s\n', nasMapping.localNasDir, nasMapping.remoteNasDir);
        return {
            Type: 'bind',
            Source: path_1.default.resolve(baseDir, nasMapping.localNasDir),
            Target: nasMapping.remoteNasDir,
            ReadOnly: false,
        };
    });
}
function resolveTmpDirToMount(absTmpDir) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!absTmpDir) {
                return [2 /*return*/, {}];
            }
            return [2 /*return*/, {
                    Type: 'bind',
                    Source: absTmpDir,
                    Target: '/tmp',
                    ReadOnly: false,
                }];
        });
    });
}
exports.resolveTmpDirToMount = resolveTmpDirToMount;
function resolveDebuggerPathToMount(debuggerPath) {
    return __awaiter(this, void 0, void 0, function () {
        var absDebuggerPath;
        return __generator(this, function (_a) {
            if (!debuggerPath) {
                return [2 /*return*/, {}];
            }
            absDebuggerPath = path_1.default.resolve(debuggerPath);
            return [2 /*return*/, {
                    Type: 'bind',
                    Source: absDebuggerPath,
                    Target: '/tmp/debugger_files',
                    ReadOnly: false,
                }];
        });
    });
}
exports.resolveDebuggerPathToMount = resolveDebuggerPathToMount;
function resolvePasswdMount() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(process.platform === 'linux')) return [3 /*break*/, 2];
                    _a = {
                        Type: 'bind'
                    };
                    return [4 /*yield*/, passwd_1.generatePwdFile()];
                case 1: return [2 /*return*/, (_a.Source = _b.sent(),
                        _a.Target = '/etc/passwd',
                        _a.ReadOnly = true,
                        _a)];
                case 2: return [2 /*return*/, null];
            }
        });
    });
}
exports.resolvePasswdMount = resolvePasswdMount;
function showDebugIdeTipsForVscode(serviceName, functionName, runtime, codeSource, debugPort) {
    return __awaiter(this, void 0, void 0, function () {
        var vscodeDebugConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, debug_1.generateVscodeDebugConfig(serviceName, functionName, runtime, codeSource, debugPort)];
                case 1:
                    vscodeDebugConfig = _a.sent();
                    // todo: auto detect .vscode/launch.json in codeuri path.
                    logger_1.default.log('You can paste these config to .vscode/launch.json, and then attach to your running function', 'yellow');
                    logger_1.default.log('///////////////// config begin /////////////////');
                    logger_1.default.log(JSON.stringify(vscodeDebugConfig, null, 4));
                    logger_1.default.log('///////////////// config end /////////////////');
                    return [2 /*return*/];
            }
        });
    });
}
function writeDebugIdeConfigForVscode(baseDir, serviceName, functionName, runtime, codeSource, debugPort) {
    return __awaiter(this, void 0, void 0, function () {
        var configJsonFolder, configJsonFilePath, e_1, vscodeDebugConfig, configInJsonFile, _a, _b, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    configJsonFolder = path_1.default.join(baseDir, '.vscode');
                    configJsonFilePath = path_1.default.join(configJsonFolder, 'launch.json');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, fs.ensureDir(path_1.default.dirname(configJsonFilePath))];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _c.sent();
                    logger_1.default.warning("Ensure directory: " + configJsonFolder + " failed.");
                    return [4 /*yield*/, showDebugIdeTipsForVscode(serviceName, functionName, runtime, codeSource, debugPort)];
                case 4:
                    _c.sent();
                    logger_1.default.debug("Ensure directory: " + configJsonFolder + " failed, error: " + e_1);
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, debug_1.generateVscodeDebugConfig(serviceName, functionName, runtime, codeSource, debugPort)];
                case 6:
                    vscodeDebugConfig = _c.sent();
                    if (!(fs.pathExistsSync(configJsonFilePath) && fs.lstatSync(configJsonFilePath).isFile())) return [3 /*break*/, 9];
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, fs.readFile(configJsonFilePath, { encoding: 'utf8' })];
                case 7:
                    configInJsonFile = _b.apply(_a, [_c.sent()]);
                    if (lodash_1.default.isEqual(configInJsonFile, vscodeDebugConfig)) {
                        return [2 /*return*/];
                    }
                    logger_1.default.warning("File: " + configJsonFilePath + " already exists, please overwrite it with the following config.");
                    return [4 /*yield*/, showDebugIdeTipsForVscode(serviceName, functionName, runtime, codeSource, debugPort)];
                case 8:
                    _c.sent();
                    return [2 /*return*/];
                case 9:
                    _c.trys.push([9, 11, , 13]);
                    return [4 /*yield*/, fs.writeFile(configJsonFilePath, JSON.stringify(vscodeDebugConfig, null, '  '), { encoding: 'utf8', flag: 'w' })];
                case 10:
                    _c.sent();
                    return [3 /*break*/, 13];
                case 11:
                    e_2 = _c.sent();
                    logger_1.default.warning("Write " + configJsonFilePath + " failed.");
                    return [4 /*yield*/, showDebugIdeTipsForVscode(serviceName, functionName, runtime, codeSource, debugPort)];
                case 12:
                    _c.sent();
                    logger_1.default.debug("Write " + configJsonFilePath + " failed, error: " + e_2);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.writeDebugIdeConfigForVscode = writeDebugIdeConfigForVscode;
function showDebugIdeTipsForPycharm(codeSource, debugPort) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.lstat(codeSource)];
                case 1:
                    stats = _a.sent();
                    if (!stats.isDirectory()) {
                        codeSource = path_1.default.dirname(codeSource);
                    }
                    logger_1.default.log("\n========= Tips for PyCharm remote debug =========\nLocal host name: " + ip.address() + "\nPort           : " + debugPort + "\nPath mappings  : " + codeSource + "=/code\n\nDebug Code needed to:\n 1. Install pydevd-pycharm:\n \n pip install pydevd-pycharm~=203.5981.165\n \n 2. copy to your function code:\n\nimport pydevd_pycharm\npydevd_pycharm.settrace('" + ip.address() + "', port=" + debugPort + ", stdoutToServer=True, stderrToServer=True)\n\n=========================================================================\n", 'yellow');
                    return [2 /*return*/];
            }
        });
    });
}
exports.showDebugIdeTipsForPycharm = showDebugIdeTipsForPycharm;
function writeEventToStreamAndClose(stream, event) {
    if (event) {
        stream.write(event);
    }
    stream.end();
}
// outputStream, errorStream used for http invoke
// because agent is started when container running and exec could not receive related logs
function startContainer(opts, outputStream, errorStream, context) {
    return __awaiter(this, void 0, void 0, function () {
        var container, err_1, logs, logStream;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createContainer(opts)];
                case 1:
                    container = _a.sent();
                    containers.add(container.id);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, container.start({})];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    logger_1.default.error(err_1);
                    return [3 /*break*/, 5];
                case 5:
                    logs = outputStream || errorStream;
                    if (!logs) return [3 /*break*/, 7];
                    if (!outputStream) {
                        outputStream = dev_null_1.default();
                    }
                    if (!errorStream) {
                        errorStream = dev_null_1.default();
                    }
                    return [4 /*yield*/, container.logs({
                            stdout: true,
                            stderr: true,
                            follow: true,
                        })];
                case 6:
                    logStream = _a.sent();
                    container.modem.demuxStream(logStream, outputStream, error_processor_1.processorTransformFactory({
                        serviceName: context.serviceName,
                        functionName: context.functionName,
                        errorStream: errorStream,
                    }));
                    _a.label = 7;
                case 7: return [2 /*return*/, {
                        containerId: container === null || container === void 0 ? void 0 : container.id,
                        stop: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        logger_1.default.debug("Stopping container: " + container.id);
                                        return [4 /*yield*/, container.stop()];
                                    case 1:
                                        _a.sent();
                                        containers.delete(container.id);
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                        kill: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        logger_1.default.debug("Killing container: " + container.id);
                                        return [4 /*yield*/, container.kill()];
                                    case 1:
                                        _a.sent();
                                        containers.delete(container.id);
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                        exec: function (cmd, _a) {
                            var _b = _a === void 0 ? {} : _a, _c = _b.cwd, cwd = _c === void 0 ? '' : _c, _d = _b.env, env = _d === void 0 ? {} : _d, _e = _b.outputStream, outputStream = _e === void 0 ? process.stdout : _e, _f = _b.errorStream, errorStream = _f === void 0 ? process.stderr : _f, _g = _b.verbose, verbose = _g === void 0 ? false : _g, _h = _b.context, context = _h === void 0 ? {} : _h, _j = _b.event, event = _j === void 0 ? null : _j;
                            return __awaiter(_this, void 0, void 0, function () {
                                var stdin, options, exec, stream;
                                return __generator(this, function (_k) {
                                    switch (_k.label) {
                                        case 0:
                                            stdin = event ? true : false;
                                            options = {
                                                Env: dockerOpts.resolveDockerEnv(env),
                                                Tty: false,
                                                AttachStdin: stdin,
                                                AttachStdout: true,
                                                AttachStderr: true,
                                                WorkingDir: cwd,
                                                User: 'root',
                                            };
                                            if (cmd !== []) {
                                                options.Cmd = cmd;
                                            }
                                            // docker exec
                                            logger_1.default.debug("docker exec opts: " + JSON.stringify(options, null, 4));
                                            return [4 /*yield*/, container.exec(options)];
                                        case 1:
                                            exec = _k.sent();
                                            return [4 /*yield*/, exec.start({ hijack: true, stdin: stdin })];
                                        case 2:
                                            stream = _k.sent();
                                            // todo: have to wait, otherwise stdin may not be readable
                                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 30); })];
                                        case 3:
                                            // todo: have to wait, otherwise stdin may not be readable
                                            _k.sent();
                                            if (event !== null) {
                                                writeEventToStreamAndClose(stream, event);
                                            }
                                            if (!outputStream) {
                                                outputStream = process.stdout;
                                            }
                                            if (!errorStream) {
                                                errorStream = process.stderr;
                                            }
                                            if (verbose) {
                                                container.modem.demuxStream(stream, outputStream, errorStream);
                                            }
                                            else {
                                                container.modem.demuxStream(stream, dev_null_1.default(), errorStream);
                                            }
                                            return [4 /*yield*/, waitForExec(exec)];
                                        case 4: return [2 /*return*/, _k.sent()];
                                    }
                                });
                            });
                        },
                    }];
            }
        });
    });
}
exports.startContainer = startContainer;
function waitForExec(exec) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        // stream.on('end') could not receive end event on windows.
                        // so use inspect to check exec exit
                        function waitContainerExec() {
                            exec.inspect(function (err, data) {
                                if (data === null || data === void 0 ? void 0 : data.Running) {
                                    setTimeout(waitContainerExec, 100);
                                    return;
                                }
                                if (err) {
                                    reject(err);
                                }
                                else if (data.ExitCode !== 0) {
                                    reject(data.ProcessConfig.entrypoint + " exited with code " + data.ExitCode);
                                }
                                else {
                                    resolve(data.ExitCode);
                                }
                            });
                        }
                        waitContainerExec();
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function stopContainer(container) {
    return __awaiter(this, void 0, void 0, function () {
        var stopVm, e_3, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stopVm = core.spinner("Stopping the container: " + container.id);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 8]);
                    return [4 /*yield*/, container.stop()];
                case 2:
                    _a.sent();
                    stopVm.succeed("Stop container succeed.");
                    return [3 /*break*/, 8];
                case 3:
                    e_3 = _a.sent();
                    stopVm.fail("Failed to stop the container.");
                    logger_1.default.debug("Stop the container: " + container.id + " failed, error: " + e_3);
                    stopVm = core.spinner("Killing the container: " + container.id);
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, container.kill()];
                case 5:
                    _a.sent();
                    stopVm.succeed("Kill container succeed");
                    return [3 /*break*/, 7];
                case 6:
                    e_4 = _a.sent();
                    stopVm.fail("Failed to kill the container.Please stop it manually.");
                    logger_1.default.debug("Kill proxy container: " + container.id + " failed, error: " + e_4);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.stopContainer = stopContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9kb2NrZXIvZG9ja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLHdEQUErQjtBQUUvQiwrREFBeUM7QUFDekMsbURBQTZEO0FBQzdELHNEQUErRDtBQUMvRCxrREFBdUI7QUFFdkIsdURBQTJDO0FBQzNDLDhDQUF3QjtBQUN4QixnQ0FBeUM7QUFDekMsMkNBQStCO0FBQy9CLDBDQUFrRDtBQUNsRCx3REFBNEM7QUFDNUMsK0NBQW9GO0FBQ3BGLHFDQUF5QjtBQUV6QiwyQ0FBd0U7QUFFeEUsNENBQTREO0FBRTVELDRDQUFtRTtBQUVuRSxzREFBK0I7QUFFL0IsSUFBTSxLQUFLLEdBQVksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUM7QUFDcEQsSUFBTSxNQUFNLEdBQVEsSUFBSSxtQkFBTSxFQUFFLENBQUM7QUFFakMsSUFBSSxVQUFVLEdBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQyxJQUFJLE9BQU8sR0FBUSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRzdCLFNBQWdCLDJCQUEyQjtJQUN6QyxPQUFPLGNBQVksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFHLENBQUM7QUFDdkYsQ0FBQztBQUZELGtFQUVDO0FBRUQsU0FBc0IsZUFBZSxDQUFDLFFBQWdCOzs7Ozt3QkFDckMscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFBOztvQkFBcEQsTUFBTSxHQUFHLFNBQTJDO29CQUMxRCxxQkFBTSxNQUFNLENBQUMs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