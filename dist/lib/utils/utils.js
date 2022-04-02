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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToSize = exports.isFalseValue = exports.mark = void 0;
var _ = __importStar(require("lodash"));
function mark(source) {
    if (!source) {
        return source;
    }
    var subStr = source.slice(-4);
    return "***********" + subStr;
}
exports.mark = mark;
function isFalseValue(val) {
    return val && (_.toLower(val) === 'false' || val === '0');
}
exports.isFalseValue = isFalseValue;
function bytesToSize(bytes) {
    var size = '';
    if (bytes < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        size = bytes.toFixed(2) + 'B';
    }
    else if (bytes < 0.1 * 1024 * 1024) {
        //小于0.1MB，则转化成KB
        size = (bytes / 1024).toFixed(2) + 'KB';
    }
    else if (bytes < 0.1 * 1024 * 1024 * 1024) {
        //小于0.1GB，则转化成MB
        size = (bytes / (1024 * 1024)).toFixed(2) + 'MB';
    }
    else {
        //其他转化成GB
        size = (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }
    var sizeStr = size + ''; //转成字符串
    var index = sizeStr.indexOf('.'); //获取小数点处的索引
    var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
    if (dou == '00') {
        //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    }
    return size;
}
exports.bytesToSize = bytesToSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBNEI7QUFFNUIsU0FBZ0IsSUFBSSxDQUFDLE1BQWM7SUFDakMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNYLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7SUFFRCxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEMsT0FBTyxnQkFBYyxNQUFRLENBQUM7QUFDaEMsQ0FBQztBQVBELG9CQU9DO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLEdBQUc7SUFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE9BQU8sSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUZELG9DQUVDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLEtBQWE7SUFDdkMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRTtRQUN0QixlQUFlO1FBQ2YsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQy9CO1NBQU0sSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLEVBQUU7UUFDcEMsZ0JBQWdCO1FBQ2hCLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ3pDO1NBQU0sSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUFFO1FBQzNDLGdCQUFnQjtRQUNoQixJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ2xEO1NBQU07UUFDTCxTQUFTO1FBQ1QsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDekQ7SUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTztJQUNoQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVztJQUM3QyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO0lBQ3BELElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUNmLHFCQUFxQjtRQUNyQixPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNuRTtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQXhCRCxrQ0F3QkMifQ==