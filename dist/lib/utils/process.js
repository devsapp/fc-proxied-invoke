"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSigint = void 0;
function setSigint() {
    // see https://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
    // @ts-ignore
    var isRaw = process.isRaw;
    var kpCallBack = function (_char, key) {
        if (key & key.ctrl && key.name === 'c') {
            // @ts-ignore
            process.emit('SIGINT');
        }
    };
    if (process.platform === 'win32') {
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(isRaw);
        }
        process.stdin.on('keypress', kpCallBack);
    }
}
exports.setSigint = setSigint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvcHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixTQUFTO0lBQ3JCLGlIQUFpSDtJQUNqSCxhQUFhO0lBQ2IsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM1QixJQUFNLFVBQVUsR0FBUSxVQUFDLEtBQUssRUFBRSxHQUFHO1FBQy9CLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDcEMsYUFBYTtZQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDLENBQUM7SUFDRixJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1FBQzlCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDNUM7QUFDTCxDQUFDO0FBaEJELDhCQWdCQyJ9