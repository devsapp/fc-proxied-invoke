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
exports.findPathsOutofSharedPaths = void 0;
var path = __importStar(require("path"));
var USER_HOME = require('os').homedir();
var fs = require('fs-extra');
var lodash_1 = __importDefault(require("lodash"));
var defaultFileSharingPaths = [
    '/Users',
    '/Volumes',
    '/private',
    '/tmp'
];
function findPathsOutofSharedPaths(mounts) {
    return __awaiter(this, void 0, void 0, function () {
        var dockerSharedPaths, pathsOutofSharedPaths, _i, mounts_1, mount, mountPath, isMountPathSharedToDocker, _a, dockerSharedPaths_1, dockerSharedPath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getSharedPathsOfDockerForMac()];
                case 1:
                    dockerSharedPaths = _b.sent();
                    pathsOutofSharedPaths = [];
                    for (_i = 0, mounts_1 = mounts; _i < mounts_1.length; _i++) {
                        mount = mounts_1[_i];
                        if (lodash_1.default.isEmpty(mount)) {
                            continue;
                        }
                        mountPath = mount.Source;
                        isMountPathSharedToDocker = false;
                        for (_a = 0, dockerSharedPaths_1 = dockerSharedPaths; _a < dockerSharedPaths_1.length; _a++) {
                            dockerSharedPath = dockerSharedPaths_1[_a];
                            if (mountPath.startsWith(dockerSharedPath)) {
                                isMountPathSharedToDocker = true;
                                break;
                            }
                        }
                        if (!isMountPathSharedToDocker) {
                            pathsOutofSharedPaths.push(mountPath);
                        }
                    }
                    return [2 /*return*/, pathsOutofSharedPaths];
            }
        });
    });
}
exports.findPathsOutofSharedPaths = findPathsOutofSharedPaths;
function getSharedPathsOfDockerForMac() {
    return __awaiter(this, void 0, void 0, function () {
        var settingsPath, fileData, settings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    settingsPath = path.join(USER_HOME, 'Library/Group Containers/group.com.docker/settings.json');
                    return [4 /*yield*/, fs.readFile(settingsPath, 'utf8')];
                case 1:
                    fileData = _a.sent();
                    settings = JSON.parse(fileData);
                    if (settings.hasOwnProperty('filesharingDirectories')) {
                        return [2 /*return*/, settings.filesharingDirectories];
                    }
                    return [2 /*return*/, defaultFileSharingPaths];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9ja2VyLXN1cHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2RvY2tlci9kb2NrZXItc3VwcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTZCO0FBQzdCLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMxQyxJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDL0Isa0RBQXVCO0FBRXZCLElBQU0sdUJBQXVCLEdBQUc7SUFDNUIsUUFBUTtJQUNSLFVBQVU7SUFDVixVQUFVO0lBQ1YsTUFBTTtDQUNULENBQUM7QUFFRixTQUFzQix5QkFBeUIsQ0FBQyxNQUFNOzs7Ozt3QkFDeEIscUJBQU0sNEJBQTRCLEVBQUUsRUFBQTs7b0JBQXhELGlCQUFpQixHQUFHLFNBQW9DO29CQUMxRCxxQkFBcUIsR0FBRyxFQUFFLENBQUM7b0JBQy9CLFdBQXdCLEVBQU4saUJBQU0sRUFBTixvQkFBTSxFQUFOLElBQU0sRUFBRTt3QkFBakIsS0FBSzt3QkFDVixJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUFFLFNBQVM7eUJBQUU7d0JBRTdCLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUMzQix5QkFBeUIsR0FBRyxLQUFLLENBQUM7d0JBQ3RDLFdBQThDLEVBQWpCLHVDQUFpQixFQUFqQiwrQkFBaUIsRUFBakIsSUFBaUIsRUFBRTs0QkFBdkMsZ0JBQWdCOzRCQUNyQixJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQ0FDeEMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO2dDQUNqQyxNQUFNOzZCQUNUO3lCQUNKO3dCQUNELElBQUksQ0FBQyx5QkFBeUIsRUFBRTs0QkFDNUIscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUN6QztxQkFDSjtvQkFDRCxzQkFBTyxxQkFBcUIsRUFBQzs7OztDQUNoQztBQW5CRCw4REFtQkM7QUFFRCxTQUFlLDRCQUE0Qjs7Ozs7O29CQUVqQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUseURBQXlELENBQUMsQ0FBQztvQkFFcEYscUJBQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEVBQUE7O29CQUFsRCxRQUFRLEdBQUcsU0FBdUM7b0JBRWxELFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUV0QyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsRUFBRTt3QkFDbkQsc0JBQU8sUUFBUSxDQUFDLHNCQUFzQixFQUFDO3FCQUMxQztvQkFDRCxzQkFBTyx1QkFBdUIsRUFBQzs7OztDQUNsQyJ9