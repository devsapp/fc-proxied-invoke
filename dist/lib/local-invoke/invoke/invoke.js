'use strict';
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
var path = __importStar(require("path"));
var _ = __importStar(require("lodash"));
var docker = __importStar(require("../../docker/docker"));
var logger_1 = __importDefault(require("../../../common/logger"));
var dockerOpts = __importStar(require("../../docker/docker-opts"));
var fs = __importStar(require("fs-extra"));
var uuid_1 = require("uuid");
var rimraf = __importStar(require("rimraf"));
var extract_zip_1 = __importDefault(require("extract-zip"));
var tmpDir = __importStar(require("temp-dir"));
var devs_1 = require("../../devs");
var runtime_1 = require("../../utils/runtime");
var docker_1 = require("../../docker/docker");
var utils_1 = require("../../utils/utils");
function isZipArchive(codeUri) {
    return codeUri ? codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war') : false;
}
function processZipCodeIfNecessary(codeUri) {
    return __awaiter(this, void 0, void 0, function () {
        var tmpCodeDir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isZipArchive(codeUri)) {
                        return [2 /*return*/, null];
                    }
                    tmpCodeDir = path.join(tmpDir, uuid_1.v4());
                    return [4 /*yield*/, fs.ensureDir(tmpCodeDir)];
                case 1:
                    _a.sent();
                    logger_1.default.log("codeUri is a zip format, will unzipping to " + tmpCodeDir);
                    return [4 /*yield*/, extract_zip_1.default(codeUri, { dir: tmpCodeDir })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, tmpCodeDir];
            }
        });
    });
}
var Invoke = /** @class */ (function () {
    function Invoke(tunnelService, sessionId, creds, region, baseDir, serviceConfig, functionConfig, triggerConfig, debugPort, debugIde, tmpDir, debuggerPath, debugArgs, nasBaseDir) {
        this.tunnelService = tunnelService;
        this.sessionId = sessionId;
        this.creds = creds;
        this.region = region;
        this.serviceName = serviceConfig.name;
        this.serviceConfig = serviceConfig;
        this.functionName = functionConfig.name;
        this.functionConfig = functionConfig;
        this.triggerConfig = triggerConfig;
        this.debugPort = debugPort;
        this.debugIde = debugIde;
        this.nasBaseDir = nasBaseDir;
        this.runtime = this.functionConfig.runtime;
        this.baseDir = baseDir;
        this.codeUri = this.functionConfig.codeUri ? path.resolve(this.baseDir, this.functionConfig.codeUri) : null;
        this.tmpDir = tmpDir;
        this.debuggerPath = debuggerPath;
        this.debugArgs = debugArgs;
    }
    Invoke.prototype.init = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, _d, _e, _f, _g, _h, _j, allMount, isDockerToolBox, isCustomContainer, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        this.nasConfig = (_a = this.serviceConfig) === null || _a === void 0 ? void 0 : _a.nasConfig;
                        _b = this;
                        return [4 /*yield*/, dockerOpts.resolveDockerUser({ nasConfig: this.nasConfig })];
                    case 1:
                        _b.dockerUser = _l.sent();
                        _c = this;
                        return [4 /*yield*/, docker.resolveNasConfigToMounts(this.baseDir, this.serviceName, this.nasConfig, this.nasBaseDir || path.join(this.baseDir, devs_1.DEFAULT_NAS_PATH_SUFFIX))];
                    case 2:
                        _c.nasMounts = _l.sent();
                        _d = this;
                        return [4 /*yield*/, processZipCodeIfNecessary(this.codeUri)];
                    case 3:
                        _d.unzippedCodeDir = _l.sent();
                        _e = this;
                        return [4 /*yield*/, docker.resolveCodeUriToMount(this.unzippedCodeDir || this.codeUri)];
                    case 4:
                        _e.codeMount = _l.sent();
                        // TODO: 支持 nas mapping yaml file
                        // this.nasMappingsMount = await docker.resolveNasYmlToMount(this.baseDir, this.serviceName);
                        _f = this;
                        if (!(!process.env.DISABLE_BIND_MOUNT_TMP_DIR || utils_1.isFalseValue(process.env.DISABLE_BIND_MOUNT_TMP_DIR))) return [3 /*break*/, 6];
                        return [4 /*yield*/, docker.resolveTmpDirToMount(this.tmpDir)];
                    case 5:
                        _g = _l.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _g = null;
                        _l.label = 7;
                    case 7:
                        // TODO: 支持 nas mapping yaml file
                        // this.nasMappingsMount = await docker.resolveNasYmlToMount(this.baseDir, this.serviceName);
                        _f.tmpDirMount = _g;
                        _h = this;
                        return [4 /*yield*/, docker.resolveDebuggerPathToMount(this.debuggerPath)];
                    case 8:
                        _h.debuggerMount = _l.sent();
                        _j = this;
                        return [4 /*yield*/, docker.resolvePasswdMount()];
                    case 9:
                        _j.passwdMount = _l.sent();
                        allMount = _.compact(__spreadArrays([this.codeMount], this.nasMounts, [this.passwdMount]));
                        if (!_.isEmpty(this.tmpDirMount)) {
                            allMount.push(this.tmpDirMount);
                        }
                        if (!_.isEmpty(this.debuggerMount)) {
                            allMount.push(this.debuggerMount);
                        }
                        return [4 /*yield*/, docker.isDockerToolBoxAndEnsureDockerVersion()];
                    case 10:
                        isDockerToolBox = _l.sent();
                        if (isDockerToolBox) {
                            this.mounts = dockerOpts.transformMountsForToolbox(allMount);
                        }
                        else {
                            this.mounts = allMount;
                        }
                        logger_1.default.debug("docker mounts: " + JSON.stringify(this.mounts, null, 4));
                        this.containerName = docker.generateRamdomContainerName();
                        isCustomContainer = runtime_1.isCustomContainerRuntime(this.runtime);
                        if (!isCustomContainer) return [3 /*break*/, 11];
                        this.imageName = this.functionConfig.customContainerConfig.image;
                        return [3 /*break*/, 13];
                    case 11:
                        _k = this;
                        return [4 /*yield*/, dockerOpts.resolveRuntimeToDockerImage(this.runtime)];
                    case 12:
                        _k.imageName = _l.sent();
                        _l.label = 13;
                    case 13: return [4 /*yield*/, docker.pullImageIfNeed(this.imageName)];
                    case 14:
                        _l.sent();
                        this.inited = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Invoke.prototype.beforeInvoke = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Invoke.prototype.setDebugIdeConfig = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.debugPort && this.debugIde)) return [3 /*break*/, 4];
                        if (!(this.debugIde.toLowerCase() === 'vscode')) return [3 /*break*/, 2];
                        // try to write .vscode/config.json
                        return [4 /*yield*/, docker_1.writeDebugIdeConfigForVscode(this.baseDir, this.serviceName, this.functionName, this.runtime, ((_a = this.functionConfig) === null || _a === void 0 ? void 0 : _a.originalCodeUri) ? path.join(this.baseDir, this.functionConfig.originalCodeUri) : null, this.debugPort)];
                    case 1:
                        // try to write .vscode/config.json
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.debugIde.toLowerCase() === 'pycharm')) return [3 /*break*/, 4];
                        return [4 /*yield*/, docker.showDebugIdeTipsForPycharm(((_b = this.functionConfig) === null || _b === void 0 ? void 0 : _b.originalCodeUri) ? path.join(this.baseDir, this.functionConfig.originalCodeUri) : null, this.debugPort)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Invoke.prototype.cleanUnzippedCodeDir = function () {
        if (this.unzippedCodeDir) {
            rimraf.sync(this.unzippedCodeDir);
            console.log("clean tmp code dir " + this.unzippedCodeDir + " successfully");
            this.unzippedCodeDir = null;
        }
    };
    Invoke.prototype.afterInvoke = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.cleanUnzippedCodeDir();
                return [2 /*return*/];
            });
        });
    };
    return Invoke;
}());
exports.default = Invoke;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2tlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9sb2NhbC1pbnZva2UvaW52b2tlL2ludm9rZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPYix5Q0FBNkI7QUFDN0Isd0NBQTRCO0FBQzVCLDBEQUE4QztBQUM5QyxrRUFBNEM7QUFDNUMsbUVBQXVEO0FBQ3ZELDJDQUErQjtBQUMvQiw2QkFBb0M7QUFDcEMsNkNBQWlDO0FBQ2pDLDREQUFrQztBQUNsQywrQ0FBbUM7QUFDbkMsbUNBQXFEO0FBQ3JELCtDQUErRDtBQUUvRCw4Q0FBbUU7QUFFbkUsMkNBQStDO0FBSS9DLFNBQVMsWUFBWSxDQUFDLE9BQU87SUFDM0IsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDNUcsQ0FBQztBQUVELFNBQWUseUJBQXlCLENBQUMsT0FBZTs7Ozs7O29CQUV0RCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUFFLHNCQUFPLElBQUksRUFBQztxQkFBRTtvQkFFdEMsVUFBVSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQU0sRUFBRSxDQUFDLENBQUM7b0JBRXZELHFCQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUE7O29CQUE5QixTQUE4QixDQUFDO29CQUUvQixnQkFBTSxDQUFDLEdBQUcsQ0FBQyxnREFBOEMsVUFBWSxDQUFDLENBQUM7b0JBQ3ZFLHFCQUFNLHFCQUFPLENBQUMs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