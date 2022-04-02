'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.unrefTimeout = void 0;
function unrefTimeout(fn, timeout) {
    if (!timeout) {
        timeout = 1500;
    }
    var t = setTimeout(fn, timeout);
    t.unref();
}
exports.unrefTimeout = unrefTimeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5yZWYtdGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvdW5yZWYtdGltZW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7OztBQUViLFNBQWdCLFlBQVksQ0FBQyxFQUFPLEVBQUUsT0FBZ0I7SUFDcEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUFFLE9BQU8sR0FBRyxJQUFJLENBQUM7S0FBRTtJQUVqQyxJQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRWxDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFORCxvQ0FNQyJ9