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
exports.unsetInvokeContainerId = exports.genStateId = exports.getProxyContainerIdFromState = exports.getHelperConfigFromState = exports.getSessionFromState = exports.getInvokeContainerIdFromState = void 0;
var lodash_1 = __importDefault(require("lodash"));
var core = __importStar(require("@serverless-devs/core"));
var devs_1 = require("./devs");
var logger_1 = __importDefault(require("../../common/logger"));
function getInvokeContainerIdFromState(accountID, region, serviceName, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAttributeFromState(accountID, region, serviceName, functionName, 'invokeContainerId')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getInvokeContainerIdFromState = getInvokeContainerIdFromState;
function getSessionFromState(accountID, region, serviceName, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAttributeFromState(accountID, region, serviceName, functionName, 'session')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getSessionFromState = getSessionFromState;
function getHelperConfigFromState(accountID, region, serviceName, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAttributeFromState(accountID, region, serviceName, functionName, 'helperConfig')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getHelperConfigFromState = getHelperConfigFromState;
function getProxyContainerIdFromState(accountID, region, serviceName, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAttributeFromState(accountID, region, serviceName, functionName, 'proxyContainerId')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProxyContainerIdFromState = getProxyContainerIdFromState;
function getAttributeFromState(accountID, region, serviceName, functionName, attributeName) {
    return __awaiter(this, void 0, void 0, function () {
        var state;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getState(accountID, region, serviceName, functionName)];
                case 1:
                    state = (_a.sent()) || {};
                    if (lodash_1.default.isEmpty(state[attributeName])) {
                        switch (attributeName) {
                            case 'proxyContainerId':
                                logger_1.default.error("Proxy container was not running. Please exec 's setup' first.");
                                break;
                            case 'helperConfig':
                                logger_1.default.error("Helper resource has not been deployed. Please exec 's setup' first.");
                                break;
                            case 'session':
                                logger_1.default.error("Session has not been established. Please exec 's setup' first.");
                                break;
                            case 'invokeContainerId':
                                logger_1.default.error("Proxy container was not running. Please exec 's setup' first.");
                                break;
                            default:
                                logger_1.default.error(attributeName + " dose not exist in state file. Please exec 's setup' first.");
                                break;
                        }
                    }
                    return [2 /*return*/, state[attributeName]];
            }
        });
    });
}
function genStateId(accountID, region, serviceName, functionName) {
    return accountID + "-" + region + "-" + serviceName + "-" + functionName;
}
exports.genStateId = genStateId;
function unsetInvokeContainerId(accountID, region, serviceName, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, devs_1.unsetKVInState('invokeContainerId', genStateId(accountID, region, serviceName, functionName))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.unsetInvokeContainerId = unsetInvokeContainerId;
function getState(accountID, region, serviceName, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        var stateId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stateId = genStateId(accountID, region, serviceName, functionName);
                    return [4 /*yield*/, core.getState(stateId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBdUI7QUFDdkIsMERBQThDO0FBRTlDLCtCQUF3QztBQUN4QywrREFBeUM7QUFFekMsU0FBc0IsNkJBQTZCLENBQUMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsV0FBbUIsRUFBRSxZQUFvQjs7Ozt3QkFDckgscUJBQU0scUJBQXFCLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixDQUFDLEVBQUE7d0JBQXJHLHNCQUFPLFNBQThGLEVBQUE7Ozs7Q0FDeEc7QUFGRCxzRUFFQztBQUVELFNBQXNCLG1CQUFtQixDQUFDLFNBQWlCLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsWUFBb0I7Ozs7d0JBQzNHLHFCQUFNLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsRUFBQTt3QkFBM0Ysc0JBQU8sU0FBb0YsRUFBQTs7OztDQUM5RjtBQUZELGtEQUVDO0FBRUQsU0FBc0Isd0JBQXdCLENBQUMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsV0FBbUIsRUFBRSxZQUFvQjs7Ozt3QkFDaEgscUJBQU0scUJBQXFCLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxFQUFBO3dCQUFoRyxzQkFBTyxTQUF5RixFQUFBOzs7O0NBQ25HO0FBRkQsNERBRUM7QUFDRCxTQUFzQiw0QkFBNEIsQ0FBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxXQUFtQixFQUFFLFlBQW9COzs7O3dCQUNwSCxxQkFBTSxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLENBQUMsRUFBQTt3QkFBcEcsc0JBQU8sU0FBNkYsRUFBQTs7OztDQUN2RztBQUZELG9FQUVDO0FBRUQsU0FBZSxxQkFBcUIsQ0FBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxXQUFtQixFQUFFLFlBQW9CLEVBQUUsYUFBcUI7Ozs7O3dCQUNqSCxxQkFBTSxRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLEVBQUE7O29CQUF6RSxLQUFLLEdBQVEsQ0FBQSxTQUE0RCxLQUFJLEVBQUU7b0JBQ3JGLElBQUksZ0JBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUU7d0JBQ2pDLFFBQVEsYUFBYSxFQUFFOzRCQUNuQixLQUFLLGtCQUFrQjtnQ0FDbkIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztnQ0FDOUUsTUFBTTs0QkFDVixLQUFLLGNBQWM7Z0NBQ2YsZ0JBQU0sQ0FBQyxLQUFLLENBQUMscUVBQXFFLENBQUMsQ0FBQztnQ0FDcEYsTUFBTTs0QkFDVixLQUFLLFNBQVM7Z0NBQ1YsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztnQ0FDL0UsTUFBTTs0QkFDVixLQUFLLG1CQUFtQjtnQ0FDcEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztnQ0FDOUUsTUFBTTs0QkFDVjtnQ0FDSSxnQkFBTSxDQUFDLEtBQUssQ0FBSSxhQUFhLGdFQUE2RCxDQUFDLENBQUM7Z0NBQzVGLE1BQU07eUJBQ2I7cUJBQ0o7b0JBQ0Qsc0JBQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFDOzs7O0NBQy9CO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLFNBQWlCLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsWUFBb0I7SUFDbkcsT0FBVSxTQUFTLFNBQUksTUFBTSxTQUFJLFdBQVcsU0FBSSxZQUFjLENBQUM7QUFDbkUsQ0FBQztBQUZELGdDQUVDO0FBRUQsU0FBc0Isc0JBQXNCLENBQUMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsV0FBbUIsRUFBRSxZQUFvQjs7Ozt3QkFDckgscUJBQU0scUJBQWMsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUMsRUFBQTs7b0JBQW5HLFNBQW1HLENBQUM7Ozs7O0NBQ3ZHO0FBRkQsd0RBRUM7QUFFRCxTQUFlLFFBQVEsQ0FBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxXQUFtQixFQUFFLFlBQW9COzs7Ozs7b0JBQzFGLE9BQU8sR0FBVyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQzFFLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUE7d0JBQW5DLHNCQUFPLFNBQTRCLEVBQUM7Ozs7Q0FDdkMifQ==