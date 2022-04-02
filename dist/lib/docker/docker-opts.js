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
exports.resolveRuntimeToDockerImage = exports.resolveDockerEnv = exports.resolveMockScript = exports.generateLocalStartOpts = exports.transformPathForVirtualBox = exports.transformMountsForToolbox = exports.resolveDockerUser = void 0;
var core_1 = require("@serverless-devs/core");
var _ = __importStar(require("lodash"));
var env_1 = require("../local-invoke/env");
var logger_1 = __importDefault(require("../../common/logger"));
var definition_1 = require("../definition");
var nested_object_assign_1 = __importDefault(require("nested-object-assign"));
var runtime_1 = require("../utils/runtime");
var utils_1 = require("../utils/utils");
var NAS_UID = 10003;
var NAS_GID = 10003;
// Not Run stage:
//  for linux platform, it will always use process.uid and process.gid
//  for mac and windows platform, it will always use 0
// Run stage:
//  for linux platform, it will always use process.uid and process.gid
//  for mac and windows platform, it will use 10003 if no nasConfig, otherwise it will use nasConfig userId
function resolveDockerUser(_a) {
    var nasConfig = _a.nasConfig, _b = _a.stage, stage = _b === void 0 ? 'run' : _b;
    var _c = definition_1.getUserIdAndGroupId(nasConfig), userId = _c.userId, groupId = _c.groupId;
    if (process.platform === 'linux') {
        logger_1.default.debug('For linux platform, Fc will use host userId and groupId to build or run your functions');
        userId = process.getuid();
        groupId = process.getgid();
    }
    else {
        if (stage === 'run') {
            if (userId === -1 || userId === undefined) {
                userId = NAS_UID;
            }
            if (groupId === -1 || groupId === undefined) {
                groupId = NAS_GID;
            }
        }
        else {
            userId = 0;
            groupId = 0;
        }
    }
    return userId + ":" + groupId;
}
exports.resolveDockerUser = resolveDockerUser;
function transformMountsForToolbox(mounts) {
    console.warn("We detected that you are using docker toolbox. For a better experience, please upgrade 'docker for windows'.\nYou can refer to Chinese doc https://github.com/alibaba/funcraft/blob/master/docs/usage/installation-zh.md#windows-%E5%AE%89%E8%A3%85-docker or English doc https://github.com/alibaba/funcraft/blob/master/docs/usage/installation.md.\n");
    if (Array.isArray(mounts)) {
        return mounts.map(function (m) {
            return transformSourcePathOfMount(m);
        });
    }
    return transformSourcePathOfMount(mounts);
}
exports.transformMountsForToolbox = transformMountsForToolbox;
function transformSourcePathOfMount(mountsObj) {
    if (!_.isEmpty(mountsObj)) {
        var replaceMounts = Object.assign({}, mountsObj);
        replaceMounts.Source = transformPathForVirtualBox(mountsObj.Source);
        return replaceMounts;
    }
    return {};
}
function transformPathForVirtualBox(source) {
    // C:\\Users\\image_crawler\\code -> /c/Users/image_crawler/code
    var sourcePath = source.split(':').join('');
    var lowerFirstAndReplace = _.lowerFirst(sourcePath.split('\\').join('/'));
    return '/' + lowerFirstAndReplace;
}
exports.transformPathForVirtualBox = transformPathForVirtualBox;
function generateLocalStartOpts(proxyContainerName, runtime, name, mounts, cmd, envs, limitedHostConfig, _a) {
    var debugPort = _a.debugPort, dockerUser = _a.dockerUser, _b = _a.debugIde, debugIde = _b === void 0 ? null : _b, imageName = _a.imageName;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (runtime_1.isCustomContainerRuntime(runtime)) {
                        return [2 /*return*/, genCustomContainerLocalStartOpts(proxyContainerName, name, mounts, cmd, envs, imageName, limitedHostConfig)];
                    }
                    return [4 /*yield*/, genNonCustomContainerLocalStartOpts(proxyContainerName, runtime, name, mounts, cmd, debugPort, envs, dockerUser, debugIde, limitedHostConfig)];
                case 1: return [2 /*return*/, _c.sent()];
            }
        });
    });
}
exports.generateLocalStartOpts = generateLocalStartOpts;
function genNonCustomContainerLocalStartOpts(proxyContainerName, runtime, name, mounts, cmd, _debugPort, envs, dockerUser, _debugIde, limitedHostConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var Memory, Ulimits, CpuPeriod, CpuQuota, hostOpts, imageName, opts, encryptedOpts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Memory = limitedHostConfig.Memory, Ulimits = limitedHostConfig.Ulimits, CpuPeriod = limitedHostConfig.CpuPeriod, CpuQuota = limitedHostConfig.CpuQuota;
                    hostOpts = {
                        HostConfig: {
                            AutoRemove: true,
                            Mounts: mounts,
                            Privileged: true,
                            Memory: Memory,
                            Ulimits: Ulimits,
                            CpuPeriod: CpuPeriod,
                            CpuQuota: CpuQuota
                        }
                    };
                    if (!_.isEmpty(proxyContainerName)) {
                        hostOpts.HostConfig.NetworkMode = "container:" + proxyContainerName;
                    }
                    return [4 /*yield*/, resolveRuntimeToDockerImage(runtime)];
                case 1:
                    imageName = _a.sent();
                    supportCustomBootstrapFile(runtime, envs);
                    opts = nested_object_assign_1.default({
                        Env: resolveDockerEnv(envs),
                        Image: imageName,
                        name: name,
                        Cmd: cmd,
                        User: dockerUser,
                        Entrypoint: [resolveMockScript(runtime)]
                    }, hostOpts);
                    encryptedOpts = encryptDockerOpts(opts);
                    logger_1.default.debug("docker options: " + JSON.stringify(encryptedOpts, null, '  '));
                    return [2 /*return*/, opts];
            }
        });
    });
}
// /**
//  * 支持通过 BOOTSTRAP_FILE 环境变量改变 bootstrap 文件名。
// **/
function supportCustomBootstrapFile(runtime, envs) {
    if (runtime === 'custom') {
        if (envs['BOOTSTRAP_FILE']) {
            envs['AGENT_SCRIPT'] = envs['BOOTSTRAP_FILE'];
        }
    }
}
function resolveMockScript(runtime) {
    if (runtime == 'python3.9') {
        return "/var/fc/runtime/python3/mock";
    }
    return "/var/fc/runtime/" + runtime + "/mock";
}
exports.resolveMockScript = resolveMockScript;
function encryptDockerOpts(dockerOpts) {
    var encryptedOpts = _.cloneDeep(dockerOpts);
    if (encryptedOpts === null || encryptedOpts === void 0 ? void 0 : encryptedOpts.Env) {
        var encryptedEnv = encryptedOpts.Env.map(function (e) {
            if (e.startsWith("FC_ACCESS_KEY_ID") || e.startsWith("FC_ACCESS_KEY_SECRET") || e.startsWith("FC_ACCOUNT_ID")) {
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
    return encryptedOpts;
}
function genCustomContainerLocalStartOpts(proxyContainerName, name, mounts, cmd, envs, imageName, limitedHostConfig) {
    var Memory = limitedHostConfig.Memory, Ulimits = limitedHostConfig.Ulimits, CpuPeriod = limitedHostConfig.CpuPeriod, CpuQuota = limitedHostConfig.CpuQuota;
    var hostOpts = {
        HostConfig: {
            AutoRemove: true,
            Mounts: mounts,
            Privileged: true,
            Memory: Memory,
            Ulimits: Ulimits,
            CpuPeriod: CpuPeriod,
            CpuQuota: CpuQuota
        }
    };
    if (!_.isEmpty(proxyContainerName)) {
        hostOpts.HostConfig.NetworkMode = "container:" + proxyContainerName;
    }
    var opts = {
        Env: resolveDockerEnv(envs, true),
        Image: imageName,
        name: name
    };
    if (cmd !== []) {
        opts.Cmd = cmd;
    }
    var ioOpts = {
        OpenStdin: true,
        Tty: false,
        StdinOnce: true,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true
    };
    var dockerOpts = nested_object_assign_1.default(opts, hostOpts, ioOpts);
    var encryptedOpts = encryptDockerOpts(dockerOpts);
    logger_1.default.debug("docker options for custom container: " + JSON.stringify(encryptedOpts, null, '  '));
    return dockerOpts;
}
function resolveDockerEnv(envs, isCustomContainer) {
    if (envs === void 0) { envs = {}; }
    if (isCustomContainer === void 0) { isCustomContainer = false; }
    if (isCustomContainer) {
        return _.map(envs || {}, function (v, k) { return k + "=" + v; });
    }
    return _.map(env_1.addEnv(envs || {}), function (v, k) { return k + "=" + v; });
}
exports.resolveDockerEnv = resolveDockerEnv;
function resolveRuntimeToDockerImage(runtime) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var fcCore;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, core_1.loadComponent('devsapp/fc-core')];
                case 1:
                    fcCore = _b.sent();
                    return [4 /*yield*/, ((_a = fcCore.resolveRuntimeToDockerImage) === null || _a === void 0 ? void 0 : _a.call(fcCore, runtime, false))];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.resolveRuntimeToDockerImage = resolveRuntimeToDockerImage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9ja2VyLW9wdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2RvY2tlci9kb2NrZXItb3B0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXNEO0FBRXRELHdDQUE0QjtBQUM1QiwyQ0FBNkM7QUFDN0MsK0RBQXlDO0FBQ3pDLDRDQUFvRDtBQUNwRCw4RUFBc0Q7QUFDdEQsNENBQTREO0FBQzVELHdDQUFzQztBQUV0QyxJQUFNLE9BQU8sR0FBVyxLQUFLLENBQUM7QUFDOUIsSUFBTSxPQUFPLEdBQVcsS0FBSyxDQUFDO0FBRzlCLGlCQUFpQjtBQUNqQixzRUFBc0U7QUFDdEUsc0RBQXNEO0FBQ3RELGFBQWE7QUFDYixzRUFBc0U7QUFDdEUsMkdBQTJHO0FBQzNHLFNBQWdCLGlCQUFpQixDQUFDLEVBQTBCO1FBQXpCLFNBQVMsZUFBQSxFQUFFLGFBQWEsRUFBYixLQUFLLG1CQUFHLEtBQUssS0FBQTtJQUNyRCxJQUFBLEtBQXNCLGdDQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUFsRCxNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQW1DLENBQUM7SUFFekQsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtRQUNoQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyx3RkFBd0YsQ0FBQyxDQUFDO1FBQ3ZHLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUM1QjtTQUFNO1FBQ0wsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO1lBQ25CLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3pDLE1BQU0sR0FBRyxPQUFPLENBQUM7YUFDbEI7WUFDRCxJQUFJLE9BQU8s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