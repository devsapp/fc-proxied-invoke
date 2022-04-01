"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeEventToStreamAndClose = void 0;
function writeEventToStreamAndClose(stream, event) {
    if (event) {
        stream.write(event);
    }
    stream.end();
}
exports.writeEventToStreamAndClose = writeEventToStreamAndClose;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91dGlscy9zdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsU0FBZ0IsMEJBQTBCLENBQUMsTUFBVyxFQUFFLEtBQVc7SUFFL0QsSUFBSSxLQUFLLEVBQUU7UUFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFQRCxnRUFPQyJ9