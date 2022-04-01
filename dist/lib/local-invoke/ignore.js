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
exports.isIgnored = void 0;
var fs = __importStar(require("fs-extra"));
var git_ignore_parser_1 = __importDefault(require("git-ignore-parser"));
var ignore_1 = __importDefault(require("ignore"));
var path = __importStar(require("path"));
var ignoredFile = ['.git', '.svn', '.env', '.DS_Store', 'template.packaged.yml', '.nas.yml', '.s/nas', '.s/tmp', '.s/package', '.s/*.json', 's.yml', 's.yaml', '.vscode', '.idea'];
function isIgnored(baseDir, runtime) {
    return __awaiter(this, void 0, void 0, function () {
        var ignoreFilePath, fileContent, ignoreDependencies, ignoredPaths, ig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ignoreFilePath = baseDir + "/.fcignore";
                    return [4 /*yield*/, getIgnoreContent(ignoreFilePath)];
                case 1:
                    fileContent = _a.sent();
                    ignoreDependencies = selectIgnored(runtime);
                    ignoredPaths = git_ignore_parser_1.default(__spreadArrays(ignoredFile, ignoreDependencies).join('\n') + "\n" + fileContent);
                    ig = ignore_1.default().add(ignoredPaths);
                    return [2 /*return*/, function (f) {
                            var relativePath = path.relative(baseDir, f);
                            if (relativePath === '') {
                                return false;
                            }
                            return ig.ignores(relativePath);
                        }];
            }
        });
    });
}
exports.isIgnored = isIgnored;
;
function getIgnoreContent(ignoreFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileContent = '';
                    if (!fs.existsSync(ignoreFilePath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs.readFile(ignoreFilePath, 'utf8')];
                case 1:
                    fileContent = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, fileContent];
            }
        });
    });
}
function selectIgnored(runtime) {
    switch (runtime) {
        case 'nodejs6':
        case 'nodejs8':
        case 'nodejs10':
        case 'nodejs12':
        case 'nodejs14':
            return ['.s/python'];
        case 'python2.7':
        case 'python3':
        case 'python3.9':
            return ['node_modules'];
        case 'php7.2':
            return ['node_modules', '.s/python'];
        default:
            return [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWdub3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9sb2NhbC1pbnZva2UvaWdub3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQStCO0FBQy9CLHdFQUF1QztBQUN2QyxrREFBNEI7QUFDNUIseUNBQTZCO0FBRTdCLElBQU0sV0FBVyxHQUFhLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFL0wsU0FBc0IsU0FBUyxDQUFDLE9BQWUsRUFBRSxPQUFnQjs7Ozs7O29CQUV6RCxjQUFjLEdBQU0sT0FBTyxlQUFZLENBQUM7b0JBRTFCLHFCQUFNLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFBOztvQkFBcEQsV0FBVyxHQUFHLFNBQXNDO29CQUVwRCxrQkFBa0IsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRzVDLFlBQVksR0FBRywyQkFBTSxDQUFJLGVBQUksV0FBVyxFQUFLLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBSyxXQUFhLENBQUMsQ0FBQztvQkFFL0YsRUFBRSxHQUFHLGdCQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3RDLHNCQUFPLFVBQVUsQ0FBQzs0QkFDaEIsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQy9DLElBQUksWUFBWSxLQUFLLEVBQUUsRUFBRTtnQ0FBRSxPQUFPLEtBQUssQ0FBQzs2QkFBRTs0QkFDMUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUNsQyxDQUFDLEVBQUM7Ozs7Q0FDSDtBQWpCRCw4QkFpQkM7QUFBQSxDQUFDO0FBRUYsU0FBZSxnQkFBZ0IsQ0FBQyxjQUFjOzs7Ozs7b0JBQ3hDLFdBQVcsR0FBRyxFQUFFLENBQUM7eUJBRWpCLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQTdCLHdCQUE2QjtvQkFDakIscUJBQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLEVBQUE7O29CQUF2RCxXQUFXLEdBQUcsU0FBeUMsQ0FBQzs7d0JBRTFELHNCQUFPLFdBQVcsRUFBQzs7OztDQUNwQjtBQUVELFNBQVMsYUFBYSxDQUFDLE9BQU87SUFDNUIsUUFBUSxPQUFPLEVBQUU7UUFDakIsS0FBSyxTQUFTLENBQUM7UUFDZixLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssVUFBVSxDQUFDO1FBQ2hCLEtBQUssVUFBVSxDQUFDO1FBQ2hCLEtBQUssVUFBVTtZQUViLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2QixLQUFLLFdBQVcsQ0FBQztRQUNqQixLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssV0FBVztZQUVkLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQixLQUFLLFFBQVE7WUFFWCxPQUFPLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDO1lBQ0UsT0FBTyxFQUFFLENBQUM7S0FDWDtBQUNILENBQUMifQ==