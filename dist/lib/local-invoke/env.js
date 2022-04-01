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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEnv = exports.resolveLibPathsFromLdConf = exports.addInstallTargetEnv = void 0;
var _ = __importStar(require("lodash"));
var definition_1 = require("../definition");
var nas_1 = require("./nas");
var path = __importStar(require("path"));
var fs = __importStar(require("fs-extra"));
var file_1 = require("../utils/file");
var sysLibs = [
    '/usr/local/lib',
    '/usr/lib',
    '/usr/lib/x86_64-linux-gnu',
    '/usr/lib64',
    '/lib',
    '/lib/x86_64-linux-gnu',
    '/python/lib/python2.7/site-packages',
    '/python/lib/python3.6/site-packages',
    '/python/lib/python3.9/site-packages'
];
var fcLibs = [
    '/code',
    '/code/lib',
    '/usr/local/lib'
];
var sysPaths = [
    '/usr/local/bin',
    '/usr/local/sbin',
    '/usr/bin',
    '/usr/sbin',
    '/sbin',
    '/bin'
];
var fcPaths = [
    '/code',
    '/code/node_modules/.bin'
];
var pythonPaths = [
    '/python/lib/python2.7/site-packages',
    '/python/lib/python3.6/site-packages',
    '/python/lib/python3.9/site-packages'
];
var funPaths = [
    '/python/bin',
    '/node_modules/.bin'
];
// This method is only used for fun install target attribue.
//
// In order to be able to use the dependencies installed in the previous step,
// such as the model serving example, fun need to configure the corresponding environment variables
// so that the install process can go through.
//
// However, if the target specifies a directory other than nas, code,
// it will not be successful by deploy, so this is an implicit rule.
//
// For fun-install, don't need to care about this rule because it has Context information for nas.
// Fun will set all environment variables before fun-install is executed.
function addInstallTargetEnv(envVars, targets) {
    var envs = Object.assign({}, envVars);
    if (!targets) {
        return envs;
    }
    _.forEach(targets, function (target) {
        var containerPath = target.containerPath;
        var prefix = containerPath;
        var targetPathonPath = pythonPaths.map(function (p) { return "" + prefix + p; }).join(':');
        if (envs['PYTHONPATH']) {
            envs['PYTHONPATH'] = envs['PYTHONPATH'] + ":" + targetPathonPath;
        }
        else {
            envs['PYTHONPATH'] = targetPathonPath;
        }
    });
    return envs;
}
exports.addInstallTargetEnv = addInstallTargetEnv;
function resolveLibPathsFromLdConf(baseDir, codeUri) {
    return __awaiter(this, void 0, void 0, function () {
        var envs, confdPath, stats, libPaths;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    envs = {};
                    if (!codeUri) {
                        return [2 /*return*/, envs];
                    }
                    confdPath = path.resolve(baseDir, codeUri, '.s/root/etc/ld.so.conf.d');
                    return [4 /*yield*/, fs.pathExists(confdPath)];
                case 1:
                    if (!(_a.sent())) {
                        return [2 /*return*/, envs];
                    }
                    return [4 /*yield*/, fs.lstat(confdPath)];
                case 2:
                    stats = _a.sent();
                    if (stats.isFile()) {
                        return [2 /*return*/, envs];
                    }
                    return [4 /*yield*/, resolveLibPaths(confdPath)];
                case 3:
                    libPaths = _a.sent();
                    if (!_.isEmpty(libPaths)) {
                        envs['LD_LIBRARY_PATH'] = libPaths.map(function (path) { return "/code/.s/root" + path; }).join(':');
                    }
                    return [2 /*return*/, envs];
            }
        });
    });
}
exports.resolveLibPathsFromLdConf = resolveLibPathsFromLdConf;
function resolveLibPaths(confdPath) {
    return __awaiter(this, void 0, void 0, function () {
        var confLines;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs.existsSync(confdPath)) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, Promise.all(fs.readdirSync(confdPath, 'utf-8')
                            .filter(function (f) { return f.endsWith('.conf'); })
                            .map(function (f) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, file_1.readLines(path.join(confdPath, f))];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 1:
                    confLines = _a.sent();
                    return [2 /*return*/, _.flatten(confLines)
                            .reduce(function (lines, line) {
                            // remove the first and last blanks and leave only the middle
                            var found = line.match(/^\s*(\/.*)\s*$/);
                            if (found && found[1].startsWith('/')) {
                                lines.push(found[1]);
                            }
                            return lines;
                        }, [])];
            }
        });
    });
}
function addEnv(envVars, nasConfig) {
    var envs = Object.assign({}, envVars);
    var prefix = '/code/.s';
    envs['LD_LIBRARY_PATH'] = generateLibPath(envs, prefix);
    envs['PATH'] = generatePath(envs, prefix);
    envs['NODE_PATH'] = generateNodePaths(envs, '/code');
    var defaultPythonPath = prefix + "/python";
    if (!envs['PYTHONUSERBASE']) {
        envs['PYTHONUSERBASE'] = defaultPythonPath;
    }
    if (nasConfig) {
        return appendNasEnvs(envs, nasConfig);
    }
    return envs;
}
exports.addEnv = addEnv;
function appendNasEnvs(envs, nasConfig) {
    var isNasAuto = definition_1.isAutoConfig(nasConfig);
    var nasEnvs;
    if (isNasAuto) {
        var mountDir = '/mnt/auto';
        nasEnvs = appendNasMountPointEnv(envs, mountDir);
    }
    else {
        if (typeof nasConfig !== 'string') {
            var mountPoints = nasConfig.mountPoints;
            _.forEach(mountPoints, function (mountPoint) {
                var mountDir = nas_1.resolveMountPoint(mountPoint).mountDir;
                nasEnvs = appendNasMountPointEnv(envs, mountDir);
            });
        }
    }
    return nasEnvs;
}
function appendNasMountPointEnv(envs, mountDir) {
    envs['LD_LIBRARY_PATH'] = generateLibPath(envs, mountDir);
    envs['PATH'] = generatePath(envs, mountDir);
    envs['NODE_PATH'] = generateNodePaths(envs, mountDir);
    var nasPythonPaths = generatePythonPaths(mountDir);
    if (envs['PYTHONPATH']) {
        envs['PYTHONPATH'] = envs['PYTHONPATH'] + ":" + nasPythonPaths;
    }
    else {
        envs['PYTHONPATH'] = nasPythonPaths;
    }
    // TODO: add other runtime envs
    return envs;
}
function generatePythonPaths(prefix) {
    return pythonPaths.map(function (p) { return "" + prefix + p; }).join(':');
}
function generateNodePaths(envs, prefix) {
    var defaultPath = "/usr/local/lib/node_modules";
    var customPath = prefix + "/node_modules";
    var path;
    if (envs['NODE_PATH']) {
        path = envs['NODE_PATH'] + ":" + customPath + ":" + defaultPath;
    }
    else {
        path = customPath + ":" + defaultPath;
    }
    return duplicateRemoval(path);
}
function generateLibPath(envs, prefix) {
    var libPath = _.union(sysLibs.map(function (p) { return prefix + "/root" + p; }), fcLibs).join(':');
    if (envs['LD_LIBRARY_PATH']) {
        libPath = envs['LD_LIBRARY_PATH'] + ":" + libPath;
    }
    return duplicateRemoval(libPath);
}
function generatePath(envs, prefix) {
    var path = _.union(sysPaths.map(function (p) { return prefix + "/root" + p; }), fcPaths, funPaths.map(function (p) { return "" + prefix + p; }), sysPaths).join(':');
    if (envs['PATH']) {
        path = envs['PATH'] + ":" + path;
    }
    return duplicateRemoval(path);
}
function duplicateRemoval(str) {
    var spliceValue = str.split(':');
    return _.union(spliceValue).join(':');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9sb2NhbC1pbnZva2UvZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3Q0FBNEI7QUFDNUIsNENBQTZDO0FBQzdDLDZCQUEwQztBQUMxQyx5Q0FBNkI7QUFDN0IsMkNBQStCO0FBQy9CLHNDQUEwQztBQUUxQyxJQUFNLE9BQU8sR0FBYTtJQUN4QixnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLDJCQUEyQjtJQUMzQixZQUFZO0lBQ1osTUFBTTtJQUNOLHVCQUF1QjtJQUN2QixxQ0FBcUM7SUFDckMscUNBQXFDO0lBQ3JDLHFDQUFxQztDQUN0QyxDQUFDO0FBRUYsSUFBTSxNQUFNLEdBQWE7SUFDdkIsT0FBTztJQUNQLFdBQVc7SUFDWCxnQkFBZ0I7Q0FDakIsQ0FBQztBQUVGLElBQU0sUUFBUSxHQUFhO0lBQ3pCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFdBQVc7SUFDWCxPQUFPO0lBQ1AsTUFBTTtDQUNQLENBQUM7QUFFRixJQUFNLE9BQU8sR0FBYTtJQUN4QixPQUFPO0lBQ1AseUJBQXlCO0NBQzFCLENBQUM7QUFHRixJQUFNLFdBQVcsR0FBYTtJQUM1QixxQ0FBcUM7SUFDckMscUNBQXFDO0lBQ3JDLHFDQUFxQztDQUN0QyxDQUFDO0FBRUYsSUFBTSxRQUFRLEdBQWE7SUFDekIsYUFBYTtJQUNiLG9CQUFvQjtDQUNyQixDQUFDO0FBRUYsNERBQTREO0FBQzVELEVBQUU7QUFDRiw4RUFBOEU7QUFDOUUsbUdBQW1HO0FBQ25HLDhDQUE4QztBQUM5QyxFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLG9FQUFvRTtBQUNwRSxFQUFFO0FBQ0Ysa0dBQWtHO0FBQ2xHLHlFQUF5RTtBQUN6RSxTQUFnQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUUs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