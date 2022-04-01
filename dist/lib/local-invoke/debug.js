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
exports.generateVscodeDebugConfig = exports.generateDebugEnv = exports.generateDockerDebugOpts = exports.getDebugOptions = void 0;
var ip = __importStar(require("ip"));
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var logger_1 = __importDefault(require("../../common/logger"));
var IDE_PYCHARM = 'pycharm';
function getDebugOptions(argsData) {
    var debugPort = argsData['debug-port'];
    logger_1.default.debug("debugPort: " + debugPort);
    var debugIde = argsData['config'];
    logger_1.default.debug("debugIde: " + debugIde);
    var debuggerPath = argsData['debugger-path'];
    logger_1.default.debug("debuggerPath: " + debuggerPath);
    var debugArgs = argsData['debug-args'];
    logger_1.default.debug("debugArgs: " + JSON.stringify(debugArgs));
    return {
        debugPort: debugPort,
        debugIde: debugIde,
        debuggerPath: debuggerPath,
        debugArgs: debugArgs
    };
}
exports.getDebugOptions = getDebugOptions;
function generateDockerDebugOpts(runtime, debugPort, debugIde) {
    var _a, _b;
    var exposedPort = debugPort + "/tcp";
    if (debugIde === IDE_PYCHARM) {
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
                            'HostPort': "" + debugPort
                        }
                    ],
                    _b)
            }
        };
    }
}
exports.generateDockerDebugOpts = generateDockerDebugOpts;
function generateDebugEnv(runtime, debugPort, debugIde) {
    var remoteIp = ip.address();
    switch (runtime) {
        case 'nodejs14':
        case 'nodejs12':
        case 'nodejs10':
        case 'nodejs8':
            return { 'DEBUG_OPTIONS': "--inspect=0.0.0.0:" + debugPort };
        case 'nodejs6':
            return { 'DEBUG_OPTIONS': "--debug-brk=" + debugPort };
        case 'python2.7':
        case 'python3':
        case 'python3.9':
            if (debugIde === IDE_PYCHARM) {
                return {};
            }
            return { 'DEBUG_OPTIONS': "-m debugpy --listen 0.0.0.0:" + debugPort };
        case 'java8':
            return { 'DEBUG_OPTIONS': "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,quiet=y,address=" + debugPort };
        case 'java11':
            return { 'DEBUG_OPTIONS': "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,quiet=y,address=*:" + debugPort };
        case 'php7.2':
            console.log("using remote_ip " + remoteIp);
            return { 'XDEBUG_CONFIG': "remote_enable=1 remote_autostart=1 remote_port=" + debugPort + " remote_connect_back=1" };
        case 'dotnetcore2.1':
            return { 'DEBUG_OPTIONS': 'true' };
        default:
            throw new Error('could not found runtime.');
    }
}
exports.generateDebugEnv = generateDebugEnv;
function generateVscodeDebugConfig(serviceName, functionName, runtime, codePath, debugPort) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.lstat(codePath)];
                case 1:
                    stats = _a.sent();
                    if (!stats.isDirectory()) {
                        codePath = path.dirname(codePath);
                    }
                    switch (runtime) {
                        case 'nodejs6':
                            return [2 /*return*/, {
                                    'version': '0.2.0',
                                    'configurations': [
                                        {
                                            'name': "fc/" + serviceName + "/" + functionName,
                                            'type': 'node',
                                            'request': 'attach',
                                            'address': 'localhost',
                                            'port': debugPort,
                                            'localRoot': "" + codePath,
                                            'remoteRoot': '/code',
                                            'protocol': 'legacy',
                                            'stopOnEntry': false
                                        }
                                    ]
                                }];
                        case 'nodejs14':
                        case 'nodejs12':
                        case 'nodejs10':
                        case 'nodejs8':
                            return [2 /*return*/, {
                                    'version': '0.2.0',
                                    'configurations': [
                                        {
                                            'name': "fc/" + serviceName + "/" + functionName,
                                            'type': 'node',
                                            'request': 'attach',
                                            'address': 'localhost',
                                            'port': debugPort,
                                            'localRoot': "" + codePath,
                                            'remoteRoot': '/code',
                                            'protocol': 'inspector',
                                            'stopOnEntry': false
                                        }
                                    ]
                                }];
                        case 'python3.9':
                        case 'python3':
                        case 'python2.7':
                            return [2 /*return*/, {
                                    'version': '0.2.0',
                                    'configurations': [
                                        {
                                            'name': "Python: fc/" + serviceName + "/" + functionName,
                                            'type': 'python',
                                            'request': 'attach',
                                            'connect': {
                                                'host': 'localhost',
                                                'port': debugPort
                                            },
                                            'pathMappings': [
                                                {
                                                    'localRoot': "" + codePath,
                                                    'remoteRoot': '/code'
                                                }
                                            ]
                                        }
                                    ]
                                }];
                        case 'java8':
                        case 'java11':
                            return [2 /*return*/, {
                                    'version': '0.2.0',
                                    'configurations': [
                                        {
                                            'name': "fc/" + serviceName + "/" + functionName,
                                            'type': 'java',
                                            'request': 'attach',
                                            'hostName': 'localhost',
                                            'port': debugPort
                                        }
                                    ]
                                }];
                        case 'php7.2':
                            return [2 /*return*/, {
                                    'version': '0.2.0',
                                    'configurations': [
                                        {
                                            'name': "fc/" + serviceName + "/" + functionName,
                                            'type': 'php',
                                            'request': 'launch',
                                            'port': debugPort,
                                            'stopOnEntry': false,
                                            'pathMappings': {
                                                '/code': "" + codePath
                                            },
                                            'ignore': [
                                                '/var/fc/runtime/**'
                                            ]
                                        }
                                    ]
                                }];
                        case 'dotnetcore2.1':
                            return [2 /*return*/, {
                                    'version': '0.2.0',
                                    'configurations': [
                                        {
                                            'name': "fc/" + serviceName + "/" + functionName,
                                            'type': 'coreclr',
                                            'request': 'attach',
                                            'processName': 'dotnet',
                                            'pipeTransport': {
                                                'pipeProgram': 'sh',
                                                'pipeArgs': [
                                                    '-c',
                                                    "docker exec -i $(docker ps -q -f publish=" + debugPort + ") ${debuggerCommand}"
                                                ],
                                                'debuggerPath': '/vsdbg/vsdbg',
                                                'pipeCwd': '${workspaceFolder}'
                                            },
                                            'windows': {
                                                'pipeTransport': {
                                                    'pipeProgram': 'powershell',
                                                    'pipeArgs': [
                                                        '-c',
                                                        "docker exec -i $(docker ps -q -f publish=" + debugPort + ") ${debuggerCommand}"
                                                    ],
                                                    'debuggerPath': '/vsdbg/vsdbg',
                                                    'pipeCwd': '${workspaceFolder}'
                                                }
                                            },
                                            'sourceFileMap': {
                                                '/code': codePath
                                            }
                                        }
                                    ]
                                }];
                        default:
                            break;
                    }
                    logger_1.default.debug('CodePath: ' + codePath);
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateVscodeDebugConfig = generateVscodeDebugConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2xvY2FsLWludm9rZS9kZWJ1Zy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlCO0FBQ3pCLDJDQUErQjtBQUMvQix5Q0FBNkI7QUFDN0IsK0RBQXlDO0FBQ3pDLElBQU0sV0FBVyxHQUFXLFNBQVMsQ0FBQztBQUV0QyxTQUFnQixlQUFlLENBQUMsUUFBYTtJQUMzQyxJQUFNLFNBQVMsR0FBVyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWMsU0FBVyxDQUFDLENBQUM7SUFDeEMsSUFBTSxRQUFRLEdBQVEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLGdCQUFNLENBQUMsS0FBSyxDQUFDLGVBQWEsUUFBVSxDQUFDLENBQUM7SUFDdEMsSUFBTSxZQUFZLEdBQVcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZELGdCQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFpQixZQUFjLENBQUMsQ0FBQztJQUM5QyxJQUFNLFNBQVMsR0FBUSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUcsQ0FBQyxDQUFDO0lBRXhELE9BQU87UUFDTCxTQUFTLFdBQUE7UUFDVCxRQUFRLFVBQUE7UUFDUixZQUFZLGNBQUE7UUFDWixTQUFTLFdBQUE7S0FDVixDQUFBO0FBQ0gsQ0FBQztBQWhCRCwwQ0FnQkM7QUFFRCxTQUFnQix1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVE7O0lBQ2xFLElBQU0sV0FBVyxHQUFNLFNBQVMsU0FBTSxDQUFDO0lBRXZDLElBQUksUUFBUSxL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