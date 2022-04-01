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
exports.convertNasConfigToNasMappings = exports.resolveMountPoint = exports.convertNasConfigToMountCmd = void 0;
var path_1 = __importDefault(require("path"));
var fs = __importStar(require("fs-extra"));
var definition_1 = require("../definition");
var logger_1 = __importDefault(require("../../common/logger"));
function convertNasConfigToMountCmd(nasConfig) {
    var isNasAuto = definition_1.isAutoConfig(nasConfig);
    if (!nasConfig) {
        return [];
    }
    if (isNasAuto) {
        logger_1.default.warning("Remote nas won't be mounted to local when nasConfig is auto.");
    }
    if (typeof nasConfig === 'string') {
        throw new Error("Unsupported nasConfig: " + nasConfig + " which should be 'auto' or 'Auto' when its type is string");
    }
    var mountPoints = nasConfig.mountPoints;
    var mountCmds = mountPoints.map(function (mountPoint) {
        return [
            'mount',
            '-t',
            'nfs',
            '-o',
            'vers=3,nolock,proto=tcp,rsize=1048576,wsize=1048576,hard,timeo=300,retrans=2,noresvport',
            mountPoint.serverAddr + ":" + mountPoint.nasDir,
            mountPoint.fcDir,
        ];
    });
    return mountCmds;
}
exports.convertNasConfigToMountCmd = convertNasConfigToMountCmd;
function resolveMountPoint(mountPoint) {
    return {
        serverPath: mountPoint.serverAddr,
        mountSource: mountPoint.nasDir,
        mountDir: mountPoint.fcDir,
    };
}
exports.resolveMountPoint = resolveMountPoint;
function convertNasConfigToNasMappings(nasBaseDir, nasConfig, serviceName) {
    return __awaiter(this, void 0, void 0, function () {
        var isNasAuto, nasDir, localNasDir, mountPoints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!nasConfig) {
                        return [2 /*return*/, []];
                    }
                    isNasAuto = definition_1.isAutoConfig(nasConfig);
                    if (!isNasAuto) return [3 /*break*/, 4];
                    nasDir = path_1.default.join(nasBaseDir, 'auto-default');
                    localNasDir = path_1.default.join(nasDir, serviceName);
                    return [4 /*yield*/, fs.pathExists(localNasDir)];
                case 1:
                    if (!!(_a.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs.ensureDir(localNasDir)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, [
                        {
                            localNasDir: localNasDir,
                            remoteNasDir: '/mnt/auto',
                        },
                    ]];
                case 4:
                    if (typeof nasConfig === 'string') {
                        throw new Error("Unsupported nasConfig: " + nasConfig + " which should be 'auto' or 'Auto' when its type is string");
                    }
                    mountPoints = nasConfig.mountPoints;
                    return [4 /*yield*/, convertMountPointsToNasMappings(nasBaseDir, mountPoints)];
                case 5: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.convertNasConfigToNasMappings = convertNasConfigToNasMappings;
function convertMountPointsToNasMappings(nasBaseDir, mountPoints) {
    return __awaiter(this, void 0, void 0, function () {
        var nasMappings, _i, mountPoints_1, mountPoint, nasMapping;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!mountPoints) {
                        return [2 /*return*/, []];
                    }
                    nasMappings = [];
                    _i = 0, mountPoints_1 = mountPoints;
                    _a.label = 1;
                case 1:
                    if (!(_i < mountPoints_1.length)) return [3 /*break*/, 4];
                    mountPoint = mountPoints_1[_i];
                    return [4 /*yield*/, convertMountPointToNasMapping(nasBaseDir, mountPoint)];
                case 2:
                    nasMapping = _a.sent();
                    nasMappings.push(nasMapping);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, nasMappings];
            }
        });
    });
}
function convertMountPointToNasMapping(nasBaseDir, mountPoint) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, mountSource, mountDir, serverPath, nasDir, localNasDir;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = resolveMountPoint(mountPoint), mountSource = _a.mountSource, mountDir = _a.mountDir, serverPath = _a.serverPath;
                    nasDir = path_1.default.join(nasBaseDir, serverPath);
                    return [4 /*yield*/, fs.pathExists(nasDir)];
                case 1:
                    if (!!(_b.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs.ensureDir(nasDir)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    localNasDir = path_1.default.join(nasDir, mountSource);
                    return [4 /*yield*/, fs.pathExists(localNasDir)];
                case 4:
                    if (!!(_b.sent())) return [3 /*break*/, 6];
                    return [4 /*yield*/, fs.ensureDir(localNasDir)];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [2 /*return*/, {
                        localNasDir: localNasDir,
                        remoteNasDir: mountDir,
                    }];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9sb2NhbC1pbnZva2UvbmFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBd0I7QUFDeEIsMkNBQStCO0FBQy9CLDRDQUE2QztBQUM3QywrREFBd0M7QUFFeEMsU0FBZ0IsMEJBQTBCLENBQUMsU0FBNkI7SUFDdEUsSUFBTSxTQUFTLEdBQUcseUJBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUUxQyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUVELElBQUksU0FBUyxFQUFFO1FBQ2IsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsOERBQThELENBQUMsQ0FBQTtLQUMvRTtJQUVELElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTBCLFNBQVMsOERBQTJELENBQUMsQ0FBQztLQUNqSDtJQUVELElBQU0sV0FBVyxHQUFpQixTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ3hELElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUFVO1FBQzNDLE9BQU87WUFDTCxPQUFPO1lBQ1AsSUFBSTtZQUNKLEtBQUs7WUFDTCxJQUFJO1lBQ0oseUZBQXlGO1lBQ3RGLFVBQVUsQ0FBQyxVQUFVLFNBQUksVUFBVSxDQUFDLE1BQVE7WUFDL0MsVUFBVSxDQUFDLEtBQUs7U0FDakIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQTdCRCxnRUE2QkM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxVQUFzQjtJQUN0RCxPQUFPO1FBQ0wsVUFBVSxFQUFFLFVBQVUsQ0FBQyxVQUFVO1FBQ2pDLFdBQVcsRUFB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