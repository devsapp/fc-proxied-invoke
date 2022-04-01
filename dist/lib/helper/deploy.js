"use strict";
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
exports.deployCleaner = void 0;
var fs_1 = __importDefault(require("fs"));
var logger_1 = __importDefault(require("../../common/logger"));
var cleaner_1 = require("./cleaner");
var retry_1 = require("../retry");
function deployCleaner(client, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, retry_1.promiseRetry(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                        var serviceConfig, functionConfig, triggerConfig, e_1, res, _i, _a, func, remoteFunctionName, e_2, e_3, e_4, err_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 20, , 21]);
                                    serviceConfig = cleaner_1.CLEANERCONFIG.serviceConfig;
                                    functionConfig = cleaner_1.CLEANERCONFIG.functionConfig;
                                    triggerConfig = cleaner_1.CLEANERCONFIG.triggerConfig;
                                    // add ak to function env
                                    Object.assign(functionConfig, {
                                        environmentVariables: {
                                            AK_ID: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeyID,
                                            AK_SECRET: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeySecret,
                                            AK_SECRET_TOKEN: credentials === null || credentials === void 0 ? void 0 : credentials.SecurityToken,
                                        },
                                    });
                                    logger_1.default.info("Creating cleaner service...");
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, client.createService(serviceConfig.name)];
                                case 2:
                                    _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _b.sent();
                                    if (e_1.name === 'FCServiceAlreadyExistsError') {
                                        logger_1.default.debug("Cleaner service already exist online.");
                                    }
                                    return [3 /*break*/, 4];
                                case 4:
                                    _b.trys.push([4, 11, , 12]);
                                    return [4 /*yield*/, client.listFunctions(serviceConfig.name)];
                                case 5:
                                    res = _b.sent();
                                    if (!(res.data.functions.length > 0)) return [3 /*break*/, 10];
                                    _i = 0, _a = res.data.functions;
                                    _b.label = 6;
                                case 6:
                                    if (!(_i < _a.length)) return [3 /*break*/, 10];
                                    func = _a[_i];
                                    remoteFunctionName = func.functionName;
                                    if (!(remoteFunctionName !== functionConfig.name)) return [3 /*break*/, 9];
                                    // remove trigger
                                    return [4 /*yield*/, client.deleteTrigger(serviceConfig.name, remoteFunctionName, triggerConfig.triggerName)];
                                case 7:
                                    // remove trigger
                                    _b.sent();
                                    // remove function
                                    return [4 /*yield*/, client.deleteFunction(serviceConfig.name, remoteFunctionName)];
                                case 8:
                                    // remove function
                                    _b.sent();
                                    _b.label = 9;
                                case 9:
                                    _i++;
                                    return [3 /*break*/, 6];
                                case 10: return [3 /*break*/, 12];
                                case 11:
                                    e_2 = _b.sent();
                                    logger_1.default.debug(e_2);
                                    return [3 /*break*/, 12];
                                case 12:
                                    _b.trys.push([12, 14, , 15]);
                                    return [4 /*yield*/, client.createFunction(serviceConfig.name, {
                                            functionName: functionConfig.name,
                                            description: functionConfig.description,
                                            handler: functionConfig.handler,
                                            memorySize: functionConfig.memorySize,
                                            runtime: functionConfig.runtime,
                                            timeout: functionConfig.timeout,
                                            environmentVariables: functionConfig.environmentVariables,
                                            code: {
                                                zipFile: fs_1.default.readFileSync(cleaner_1.CLEANERCONFIG.zipFile, 'base64'),
                                            },
                                        })];
                                case 13:
                                    _b.sent();
                                    return [3 /*break*/, 15];
                                case 14:
                                    e_3 = _b.sent();
                                    if (e_3.name === 'FCFunctionAlreadyExistsError') {
                                        logger_1.default.debug("Cleaner function already exist online.");
                                    }
                                    return [3 /*break*/, 15];
                                case 15:
                                    _b.trys.push([15, 17, , 18]);
                                    return [4 /*yield*/, client.createTrigger(serviceConfig.name, functionConfig.name, triggerConfig)];
                                case 16:
                                    _b.sent();
                                    return [3 /*break*/, 18];
                                case 17:
                                    e_4 = _b.sent();
                                    if (e_4.name === 'FCTriggerAlreadyExistsError') {
                                        logger_1.default.debug("Cleaner trigger already exist online.");
                                    }
                                    return [3 /*break*/, 18];
                                case 18: return [4 /*yield*/, client.invokeFunction(serviceConfig.name, functionConfig.name, null)];
                                case 19:
                                    _b.sent();
                                    return [3 /*break*/, 21];
                                case 20:
                                    err_1 = _b.sent();
                                    logger_1.default.error(err_1);
                                    retry(err_1);
                                    return [3 /*break*/, 21];
                                case 21: return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deployCleaner = deployCleaner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwZXIvZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFvQjtBQUNwQiwrREFBeUM7QUFDekMscUNBQTBDO0FBSTFDLGtDQUF3QztBQUV4QyxTQUFzQixhQUFhLENBQUMsTUFBVyxFQUFFLFdBQXlCOzs7Ozt3QkFDeEUscUJBQU0sb0JBQVksQ0FBQyxVQUFPLEtBQVUsRUFBRSxLQUFhOzs7Ozs7b0NBRTNDLGFBQWEsR0FBa0IsdUJBQWEsQ0FBQyxhQUFhLENBQUM7b0NBQzNELGNBQWMsR0FBbUIsdUJBQWEsQ0FBQyxjQUFjLENBQUM7b0NBQzlELGFBQWEsR0FBUSx1QkFBYSxDQUFDLGFBQWEsQ0FBQztvQ0FFckQseUJBQXlCO29DQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTt3Q0FDNUIsb0JBQW9CLEVBQUU7NENBQ3BCLEtBQUssRUFBRSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsV0FBVzs0Q0FDL0IsU0FBUyxFQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxlQUFlOzRDQUN2QyxlQUFlLEVBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLGFBQWE7eUNBQzVDO3FDQUNGLENBQUMsQ0FBQztvQ0FDSCxnQkFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDOzs7O29DQUV6QyxxQkFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQTs7b0NBQTlDLFNBQThDLENBQUM7Ozs7b0NBRS9DLElBQUksR0FBQyxDQUFDLElBQUksS0FBSyw2QkFBNkIsRUFBRTt3Q0FDNUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztxQ0FDdkQ7Ozs7b0NB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