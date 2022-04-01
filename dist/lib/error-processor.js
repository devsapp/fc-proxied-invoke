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
exports.processMakeHelperFunctionErr = exports.processorTransformFactory = exports.FilterChain = void 0;
var httpx = require('httpx');
var cheerio = require('cheerio');
var detectMocha = require('detect-mocha');
var logger_1 = __importDefault(require("../common/logger"));
var stream_1 = require("stream");
var prompt_1 = require("./prompt");
var unrefTimeout = require('./utils/unref-timeout').unrefTimeout;
var _ = require('lodash');
var FilterChain = /** @class */ (function () {
    function FilterChain(options) {
        if (options === void 0) { options = {}; }
        this.processors = [
            new PuppeteerInvalidPlatformProcessor(options),
            new DynamicLinkLibraryMissingProcessor(options),
            new NoSpaceLeftOnDeviceProcessor(options),
            new MissingAptGetProcessor(options),
            new DockerNotStartedOrInstalledErrorProcessor(options),
            new FcServiceNotEnabledProcessor(options),
            new RamInactiveErrorProcessor(options),
            new LogInactiveErrorProcessor(options),
            new ClientTimeoutErrorProcessor(options),
        ];
    }
    FilterChain.prototype.process = function (message, err) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, processor;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.processors;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        processor = _a[_i];
                        if (!message) {
                            message = '';
                        }
                        if (!processor.match(message, err)) return [3 /*break*/, 4];
                        return [4 /*yield*/, processor.process(message, err)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, processor.postProcess()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return FilterChain;
}());
exports.FilterChain = FilterChain;
var ErrorProcessor = /** @class */ (function () {
    function ErrorProcessor(options) {
        this.serviceName = options === null || options === void 0 ? void 0 : options.serviceName;
        this.functionName = options === null || options === void 0 ? void 0 : options.functionName;
    }
    ErrorProcessor.prototype.match = function (message, err) { };
    ErrorProcessor.prototype.process = function (message, err) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    ErrorProcessor.prototype._autoExist = function () {
        process.nextTick(function () {
            logger_1.default.log('\nFc will auto exit after 3 seconds.\n', 'red');
            if (!detectMocha()) {
                unrefTimeout(function () {
                    // @ts-ignore
                    process.emit('SIGINT');
                }, 3000);
            }
        });
    };
    ErrorProcessor.prototype.postProcess = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log();
                return [2 /*return*/];
            });
        });
    };
    return ErrorProcessor;
}());
var ClientTimeoutErrorProcessor = /** @class */ (function (_super) {
    __extends(ClientTimeoutErrorProcessor, _super);
    function ClientTimeoutErrorProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientTimeoutErrorProcessor.prototype.match = function (message, err) {
        return _.includes(message, 'ReadTimeout(');
    };
    ClientTimeoutErrorProcessor.prototype.process = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger_1.default.log("The timeout of API request has been detected.", 'red');
                return [2 /*return*/];
            });
        });
    };
    return ClientTimeoutErrorProcessor;
}(ErrorProcessor));
var DockerNotStartedOrInstalledErrorProcessor = /** @class */ (function (_super) {
    __extends(DockerNotStartedOrInstalledErrorProcessor, _super);
    function DockerNotStartedOrInstalledErrorProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DockerNotStartedOrInstalledErrorProcessor.prototype.match = function (message, err) {
        if (_.includes(message, 'connect ECONNREFUSED /var/run/docker.sock') || _.includes(message, 'Error: connect ENOENT //./pipe/docker_engine')) {
            return true;
        }
        return false;
    };
    DockerNotStartedOrInstalledErrorProcessor.prototype.process = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger_1.default.log("Fc detected that Docker is not installed on your host or not started. Please run 'docker ps' command to check docker status.");
                return [2 /*return*/];
            });
        });
    };
    return DockerNotStartedOrInstalledErrorProcessor;
}(ErrorProcessor));
var FcServiceNotEnabledProcessor = /** @class */ (function (_super) {
    __extends(FcServiceNotEnabledProcessor, _super);
    function FcServiceNotEnabledProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FcServiceNotEnabledProcessor.prototype.match = function (message, err) {
        if (_.includes(message, 'FC service is not enabled for current user')) {
            return true;
        }
        return false;
    };
    FcServiceNotEnabledProcessor.prototype.process = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger_1.default.log('FC service is not enabled for current user. Please enable FC service before using fc.\nYou can enable FC service on this page https://www.aliyun.com/product/fc .');
                return [2 /*return*/];
            });
        });
    };
    return FcServiceNotEnabledProcessor;
}(ErrorProcessor));
var RamInactiveErrorProcessor = /** @class */ (function (_super) {
    __extends(RamInactiveErrorProcessor, _super);
    function RamInactiveErrorProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RamInactiveErrorProcessor.prototype.match = function (message, err) {
        return _.includes(message, 'Account is inactive to this service') && _.includes(message, 'ram.aliyuncs.com');
    };
    RamInactiveErrorProcessor.prototype.process = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger_1.default.log('Ram service is not enabled for current user. Please enable Ram service before using fc.\nYou can enable Ram service on this page https://www.aliyun.com/product/ram .');
                return [2 /*return*/];
            });
        });
    };
    return RamInactiveErrorProcessor;
}(ErrorProcessor));
var LogInactiveErrorProcessor = /** @class */ (function (_super) {
    __extends(LogInactiveErrorProcessor, _super);
    function LogInactiveErrorProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogInactiveErrorProcessor.prototype.match = function (message, err) {
        return err && err.code === 'InvalidAccessKeyId' && _.includes(message, 'AccessKeyId') && _.includes(message, 'is inactive');
    };
    LogInactiveErrorProcessor.prototype.process = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger_1.default.log('\nPlease go to https://sls.console.aliyun.com/ to open the LogServce.');
                return [2 /*return*/];
            });
        });
    };
    return LogInactiveErrorProcessor;
}(ErrorProcessor));
// 发生在 s build 安装依赖，但是依赖包含解决方案，比如 puppeteer，需要使用 apt-get 安装，如果宿主机没有，那就提示使用 s build -d
var MissingAptGetProcessor = /** @class */ (function (_super) {
    __extends(MissingAptGetProcessor, _super);
    function MissingAptGetProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MissingAptGetProcessor.prototype.match = function (message) {
        return _.includes(message, 'touch: /var/cache/apt/pkgcache.bin: No such file or directory');
    };
    MissingAptGetProcessor.prototype.process = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                process.nextTick(function () {
                    logger_1.default.log("Tips: Fc has detected that there is no apt-get installed on the machine, you need use 's build --use-docker' to reinstall.\nType 's build -h' for more help.");
                });
                return [2 /*return*/];
            });
        });
    };
    return MissingAptGetProcessor;
}(ErrorProcessor));
var NoSpaceLeftOnDeviceProcessor = /** @class */ (function (_super) {
    __extends(NoSpaceLeftOnDeviceProcessor, _super);
    function NoSpaceLeftOnDeviceProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoSpaceLeftOnDeviceProcessor.prototype.match = function (message) {
        return _.includes(message, 'no space left on device');
    };
    NoSpaceLeftOnDeviceProcessor.prototype.process = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                process.nextTick(function () {
                    logger_1.default.log("Tips: Fc has detected that docker is no space left. \nif You are using Docker for Windows/Mac, you can select the Docker icon and then Preferences > Resources > Advanced and increase docker image size.\nPlease refer to https://docs.docker.com/docker-for-mac/space/ for more help.\n");
                });
                return [2 /*return*/];
            });
        });
    };
    return NoSpaceLeftOnDeviceProcessor;
}(ErrorProcessor));
var DynamicLinkLibraryMissingProcessor = /** @class */ (function (_super) {
    __extends(DynamicLinkLibraryMissingProcessor, _super);
    function DynamicLinkLibraryMissingProcessor(options) {
        var _this = _super.call(this, options) || this;
        _this.prefix = 'error while loading shared libraries: ';
        _this.suffix = ': cannot open shared object file: No such file or directory';
        _this.debianPakcageUrlPrefix = 'https://packages.debian.org/search?lang=en&suite=jessie&arch=amd64&mode=path&searchon=contents&keywords=';
        _this.libPrefixWhiteList = ['/usr/lib/x86_64-linux-gnu', '/lib/x86_64-linux-gnu', '/usr/local/lib'];
        return _this;
    }
    DynamicLinkLibraryMissingProcessor.prototype.match = function (message) {
        return _.includes(message, this.prefix) && _.includes(message, this.suffix);
    };
    DynamicLinkLibraryMissingProcessor.prototype._findPackageByDlName = function (lib) {
        return __awaiter(this, void 0, void 0, function () {
            var response, body, $, packagesTable, packageInfo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, httpx.request("" + this.debianPakcageUrlPrefix + lib, { timeout: 10000 })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, httpx.read(response, 'utf8')];
                    case 2:
                        body = _a.sent();
                        $ = cheerio.load(body);
                        packagesTable = $('#pcontentsres table tbody tr')
                            .map(function (i, element) { return ({
                            path: $(element).find('td:nth-of-type(1)').text().trim(),
                            name: $(element).find('td:nth-of-type(2)').text().trim(),
                        }); })
                            .get();
                        packageInfo = _.find(packagesTable, function (info) { return _.some(_this.libPrefixWhiteList, function (prefix) { return info.path.startsWith(prefix); }); });
                        if (packageInfo) {
                            return [2 /*return*/, packageInfo.name];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    DynamicLinkLibraryMissingProcessor.prototype._fetchDlName = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var prefixIdx, suffixIdx;
            return __generator(this, function (_a) {
                prefixIdx = message.indexOf(this.prefix);
                suffixIdx = message.indexOf(this.suffix);
                return [2 /*return*/, message.substring(prefixIdx + this.prefix.length, suffixIdx)];
            });
        });
    };
    DynamicLinkLibraryMissingProcessor.prototype.process = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var lib, packageName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fetchDlName(message)];
                    case 1:
                        lib = _a.sent();
                        return [4 /*yield*/, this._findPackageByDlName(lib)];
                    case 2:
                        packageName = _a.sent();
                        if (packageName) {
                            process.nextTick(function () {
                                logger_1.default.log("Tips: Fc has detected that you are missing " + lib + " library, you can try to install it like this:\n\n  step1: s build sbox -f " + _this.serviceName + "/" + _this.functionName + " -i\n  step2: fun-install apt-get install " + packageName + "\n  step3: type 'exit' to exit container and then reRun your function\n\nAlso you can install dependencies through one command:\n\n  s build sbox -f " + _this.serviceName + "/" + _this.functionName + " --cmd 'fun-install apt-get install " + packageName + "'\n");
                            });
                        }
                        else {
                            logger_1.default.log("Tips: Fc has detected that you are missing " + lib + " library, you can try to install it like this:\n\n  step1: open this page " + this.debianPakcageUrlPrefix + lib + " to find your missing dependency\n  step2: s install sbox -f " + this.serviceName + "/" + this.functionName + " -i\n  step3: fun-install apt-get install YourPackageName\n  step4: type 'exit' to exit container and then reRun your function\n\nAlso you can install dependencies through one command:\n\n  s install sbox -f " + this.serviceName + "/" + this.functionName + " --cmd 'fun-install apt-get install YourPackageName'\n");
                        }
                        this._autoExist();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DynamicLinkLibraryMissingProcessor;
}(ErrorProcessor));
var PuppeteerInvalidPlatformProcessor = /** @class */ (function (_super) {
    __extends(PuppeteerInvalidPlatformProcessor, _super);
    function PuppeteerInvalidPlatformProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuppeteerInvalidPlatformProcessor.prototype.match = function (message) {
        return _.includes(message, 'Error: Chromium revision is not downloaded. Run "npm install" or "yarn install"');
    };
    PuppeteerInvalidPlatformProcessor.prototype.process = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                process.nextTick(function () {
                    logger_1.default.log("Tips: Fc has detected that your puppeteer installation platform is incorrect. \nPlease reinstall it like this:\n\n1. s install sbox -f " + _this.serviceName + "/" + _this.functionName + " -i\n2. fun-install npm install puppeteer\n3. type 'exit' to exit container and then reRun your function\n\nAlso you can install puppeteer through one command: \ns install sbox -f puppeteer/html2png --cmd 'fun-install npm install puppeteer'");
                    _this._autoExist();
                });
                return [2 /*return*/];
            });
        });
    };
    return PuppeteerInvalidPlatformProcessor;
}(ErrorProcessor));
var ChunkSplitTransform = /** @class */ (function (_super) {
    __extends(ChunkSplitTransform, _super);
    function ChunkSplitTransform(options) {
        var _this = _super.call(this, options) || this;
        _this._buffer = '';
        _this._separator = options.separator || '\n';
        return _this;
    }
    ChunkSplitTransform.prototype._transform = function (chunk, encoding, done) {
        var sepPos;
        this._buffer += chunk.toString();
        while ((sepPos = this._buffer.indexOf(this._separator)) !== -1) {
            var portion = this._buffer.substr(0, sepPos);
            this.push(portion + this._separator);
            this._buffer = this._buffer.substr(sepPos + this._separator.length);
        }
        done();
    };
    ChunkSplitTransform.prototype._flush = function (done) {
        this.push(this._buffer);
        done();
    };
    return ChunkSplitTransform;
}(stream_1.Transform));
var FcErrorTransform = /** @class */ (function (_super) {
    __extends(FcErrorTransform, _super);
    function FcErrorTransform(options) {
        var _this = _super.call(this, options) || this;
        _this.filterChain = new FilterChain(options);
        return _this;
    }
    FcErrorTransform.prototype._transform = function (chunk, encoding, done) {
        var _this = this;
        var message = chunk.toString();
        this.filterChain.process(message).then(function () {
            _this.push(message);
            done();
        });
    };
    return FcErrorTransform;
}(stream_1.Transform));
function processorTransformFactory(_a) {
    var serviceName = _a.serviceName, functionName = _a.functionName, errorStream = _a.errorStream;
    var transform = new ChunkSplitTransform({
        separator: '\n',
    });
    transform
        .pipe(new FcErrorTransform({
        serviceName: serviceName,
        functionName: functionName,
    }))
        .pipe(errorStream);
    return transform;
}
exports.processorTransformFactory = processorTransformFactory;
function processMakeHelperFunctionErr(e, retryTimes, assumeYes) {
    return __awaiter(this, void 0, void 0, function () {
        var isContinue, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((e === null || e === void 0 ? void 0 : e.code) === 'OSSInvalidRequest' && (e === null || e === void 0 ? void 0 : e.message.includes("event source 'oss' returned error: Cannot specify overlapping prefix and suffix with same event type")))) return [3 /*break*/, 4];
                    if (!(retryTimes === 1)) return [3 /*break*/, 3];
                    _a = assumeYes;
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, prompt_1.isDeleteOssTriggerAndContinue()];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    isContinue = _a;
                    if (isContinue) {
                        return [2 /*return*/, 'deleteOssTrigger'];
                    }
                    else {
                        throw new Error("Oss trigger can not be deployed under helper function because it already exists online. Please delete it manually: https://fc.console.aliyun.com/fc/overview. You can also use s fc-api component: https://github.com/devsapp/fc-api. Then exec 's cleanup' to remove the deployed helper resource. Then try 's setup' again.");
                    }
                    return [3 /*break*/, 4];
                case 3: throw new Error("Attempt to delete oss trigger failed. Please delete it manually: https://fc.console.aliyun.com/fc/overview. You can also use s fc-api component: https://github.com/devsapp/fc-api.");
                case 4: throw e;
            }
        });
    });
}
exports.processMakeHelperFunctionErr = processMakeHelperFunctionErr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcHJvY2Vzc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9lcnJvci1wcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFNUMsNERBQXNDO0FBQ3RDLGlDQUFtQztBQUNuQyxtQ0FBeUQ7QUFDakQsSUFBQSxZQUFZLEdBQUssT0FBTyxDQUFDLHVCQUF1QixDQUFDLGFBQXJDLENBQXNDO0FBRTFELElBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUU1QjtJQUVFLHFCQUFZLE9BQVk7UUFBWix3QkFBQSxFQUFBLFlBQVk7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixJQUFJLGlDQUFpQyxDQUFDLE9BQU8sQ0FBQztZQUM5QyxJQUFJLGtDQUFrQyxDQUFDLE9BQU8sQ0FBQztZQUMvQyxJQUFJLDRCQUE0QixDQUFDLE9BQU8sQ0FBQztZQUN6QyxJQUFJLHNCQUFzQixDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLHlDQUF5QyxDQUFDLE9BQU8sQ0FBQztZQUN0RCxJQUFJLDRCQUE0QixDQUFDLE9BQU8sQ0FBQztZQUN6QyxJQUFJLHlCQUF5QixDQUFDLE9BQU8sQ0FBQztZQUN0QyxJQUFJLHlCQUF5QixDQUFDLE9BQU8sQ0FBQztZQUN0QyxJQUFJLDJCQUEyQixDQUFDLE9BQU8sQ0FBQztTQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUVLLDZCQUFPLEdBQWIsVUFBYyxPQUFZLEVBQUUsR0FBUzs7Ozs7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