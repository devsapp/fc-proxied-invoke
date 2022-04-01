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
exports.unsetKVInState = exports.setKVInState = void 0;
var core = __importStar(require("@serverless-devs/core"));
var lodash_1 = __importDefault(require("lodash"));
function setKVInState(key, value, stateId) {
    return __awaiter(this, void 0, void 0, function () {
        var state;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, core.getState(stateId)];
                case 1:
                    state = _c.sent();
                    if (!lodash_1.default.isEmpty(state)) return [3 /*break*/, 3];
                    return [4 /*yield*/, core.setState(stateId, (_a = {}, _a[key] = value, _a))];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 3:
                    Object.assign(state, (_b = {},
                        _b[key] = value,
                        _b));
                    return [4 /*yield*/, core.setState(stateId, state)];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.setKVInState = setKVInState;
function unsetKVInState(key, stateId) {
    return __awaiter(this, void 0, void 0, function () {
        var state, resolvedState;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.getState(stateId)];
                case 1:
                    state = _a.sent();
                    if (!state || !(key in state)) {
                        return [2 /*return*/];
                    }
                    resolvedState = lodash_1.default.omit(state, [key]);
                    if (!state) return [3 /*break*/, 3];
                    return [4 /*yield*/, core.setState(stateId, resolvedState)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.unsetKVInState = unsetKVInState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvZGV2cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLGtEQUF1QjtBQUV2QixTQUFzQixZQUFZLENBQUMsR0FBVyxFQUFFLEtBQVUsRUFBRSxPQUFlOzs7Ozs7d0JBQ3BELHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUE7O29CQUF6QyxLQUFLLEdBQVEsU0FBNEI7eUJBQzNDLGdCQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFoQix3QkFBZ0I7b0JBQ2hCLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxZQUFJLEdBQUMsR0FBRyxJQUFHLEtBQUssTUFBRyxFQUFBOztvQkFBOUMsU0FBOEMsQ0FBQzs7O29CQUUvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUs7d0JBQ2YsR0FBQyxHQUFHLElBQUcsS0FBSzs0QkFDZCxDQUFDO29CQUNILHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFBOztvQkFBbkMsU0FBbUMsQ0FBQzs7Ozs7O0NBRTNDO0FBVkQsb0NBVUM7QUFFRCxTQUFzQixjQUFjLENBQUMsR0FBVyxFQUFFLE9BQWU7Ozs7O3dCQUMxQyxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFBOztvQkFBekMsS0FBSyxHQUFRLFNBQTRCO29CQUMvQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUU7d0JBQUUsc0JBQU87cUJBQUU7b0JBQ3BDLGFBQWEsR0FBUSxnQkFBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUM1QyxLQUFLLEVBQUwsd0JBQUs7b0JBQ0wscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUE7O29CQUEzQyxTQUEyQyxDQUFDOzs7Ozs7Q0FFbkQ7QUFQRCx3Q0FPQyJ9