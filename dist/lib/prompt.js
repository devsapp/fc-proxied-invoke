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
exports.getYesOrNo = exports.isDeleteOssTriggerAndContinue = exports.isContinueWhenNasMountError = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
function isContinueWhenNasMountError() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getYesOrNo('Do you want to mount nas in local mode and continue?')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.isContinueWhenNasMountError = isContinueWhenNasMountError;
function isDeleteOssTriggerAndContinue() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getYesOrNo('Do you want to remove the remote oss trigger and continue?')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.isDeleteOssTriggerAndContinue = isDeleteOssTriggerAndContinue;
function getYesOrNo(message) {
    return __awaiter(this, void 0, void 0, function () {
        var promptList, isContinue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promptList = [
                        {
                            type: 'list',
                            message: message,
                            name: 'isContinue',
                            choices: ['Yes', 'No'],
                            filter: function (val) {
                                return val === 'Yes';
                            },
                        },
                    ];
                    return [4 /*yield*/, inquirer_1.default.prompt(promptList)];
                case 1:
                    isContinue = (_a.sent()).isContinue;
                    return [2 /*return*/, isContinue];
            }
        });
    });
}
exports.getYesOrNo = getYesOrNo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9wcm9tcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWdDO0FBRWhDLFNBQXNCLDJCQUEyQjs7Ozt3QkFDeEMscUJBQU0sVUFBVSxDQUFDLHNEQUFzRCxDQUFDLEVBQUE7d0JBQS9FLHNCQUFPLFNBQXdFLEVBQUM7Ozs7Q0FDakY7QUFGRCxrRUFFQztBQUVELFNBQXNCLDZCQUE2Qjs7Ozt3QkFDMUMscUJBQU0sVUFBVSxDQUFDLDREQUE0RCxDQUFDLEVBQUE7d0JBQXJGLHNCQUFPLFNBQThFLEVBQUM7Ozs7Q0FDdkY7QUFGRCxzRUFFQztBQUVELFNBQXNCLFVBQVUsQ0FBQyxPQUFlOzs7Ozs7b0JBQ3hDLFVBQVUsR0FBRzt3QkFDakI7NEJBQ0UsSUFBSSxFQUFFLE1BQU07NEJBQ1osT0FBTyxTQUFBOzRCQUNQLElBQUksRUFBRSxZQUFZOzRCQUNsQixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDOzRCQUN0QixNQUFNLEVBQUUsVUFBVSxHQUFRO2dDQUN4QixPQUFPLEdBQUcsS0FBSyxLQUFLLENBQUM7NEJBQ3ZCLENBQUM7eUJBQ0Y7cUJBQ0YsQ0FBQztvQkFDMkIscUJBQU0sa0JBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUE7O29CQUF4RCxVQUFVLEdBQVksQ0FBQyxTQUFpQyxDQUFDLENBQUMsVUFBVTtvQkFDMUUsc0JBQU8sVUFBVSxFQUFDOzs7O0NBQ25CO0FBZEQsZ0NBY0MifQ==