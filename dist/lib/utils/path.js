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
exports.isNccPath = exports.ensureTmpDir = void 0;
var path = __importStar(require("path"));
var devs_1 = require("../devs");
var fs = __importStar(require("fs-extra"));
function ensureTmpDir(tmpDir, devsPath, serviceName, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        var absTmpDir, stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    absTmpDir = tmpDir ? path.resolve(tmpDir) : path.resolve(devs_1.detectTmpDir(devsPath), serviceName, functionName);
                    return [4 /*yield*/, fs.pathExists(absTmpDir)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs.lstat(absTmpDir)];
                case 2:
                    stats = _a.sent();
                    if (stats.isFile()) {
                        throw new Error("'" + absTmpDir + "' should be a directory.");
                    }
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, fs.ensureDir(absTmpDir, {
                        mode: parseInt('0777', 8)
                    })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, absTmpDir];
            }
        });
    });
}
exports.ensureTmpDir = ensureTmpDir;
function isNccPath(targetPath) {
    return path.basename(targetPath) === 'dist';
}
exports.isNccPath = isNccPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvcGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTZCO0FBQzdCLGdDQUF1QztBQUN2QywyQ0FBK0I7QUFFL0IsU0FBc0IsWUFBWSxDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLFdBQW1CLEVBQUUsWUFBb0I7Ozs7OztvQkFFdEcsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFFOUcscUJBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBQTs7eUJBQTlCLFNBQThCLEVBQTlCLHdCQUE4QjtvQkFFbEIscUJBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBQTs7b0JBQWpDLEtBQUssR0FBRyxTQUF5QjtvQkFFdkMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBSSxTQUFTLDZCQUEwQixDQUFDLENBQUM7cUJBQzFEOzt3QkFFRCxxQkFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTt3QkFDNUIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO3FCQUMxQixDQUFDLEVBQUE7O29CQUZGLFNBRUUsQ0FBQzs7d0JBR0wsc0JBQU8sU0FBUyxFQUFDOzs7O0NBQ2xCO0FBbEJELG9DQWtCQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxVQUFrQjtJQUMxQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssTUFBTSxDQUFDO0FBQzlDLENBQUM7QUFGRCw4QkFFQyJ9