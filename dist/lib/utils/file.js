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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLines = void 0;
var readline_1 = __importDefault(require("readline"));
var fs = __importStar(require("fs-extra"));
function readLines(fileName) {
    return new Promise(function (resolve, reject) {
        var lines = [];
        readline_1.default.createInterface({ input: fs.createReadStream(fileName) })
            .on('line', function (line) { return lines.push(line); })
            .on('close', function () { return resolve(lines); })
            .on('error', reject);
    });
}
exports.readLines = readLines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWdDO0FBQ2hDLDJDQUErQjtBQUUvQixTQUFnQixTQUFTLENBQUMsUUFBUTtJQUM5QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDL0IsSUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO1FBRTNCLGtCQUFRLENBQUMsZUFBZSxDQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBQyxDQUFDO2FBQzNELEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFoQixDQUFnQixDQUFDO2FBQ3BDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBZCxDQUFjLENBQUM7YUFDakMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFURCw4QkFTQyJ9