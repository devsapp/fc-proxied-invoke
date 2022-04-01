"use strict";
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
exports.FcRemoteInvokeComponent = void 0;
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var FcRemoteInvokeComponent = /** @class */ (function (_super) {
    __extends(FcRemoteInvokeComponent, _super);
    function FcRemoteInvokeComponent(region, serviceName, access, appName, path, functionName) {
        var _this = _super.call(this, access, appName, path) || this;
        _this.serviceName = serviceName;
        _this.functionName = functionName;
        _this.region = region;
        return _this;
    }
    FcRemoteInvokeComponent.prototype.genComponentProp = function () {
        var prop = {};
        Object.assign(prop, { region: this.region });
        if (!_.isEmpty(this.serviceName)) {
            Object.assign(prop, { serviceName: this.serviceName });
        }
        if (!_.isEmpty(this.functionName)) {
            Object.assign(prop, { functionName: this.functionName });
        }
        return prop;
    };
    return FcRemoteInvokeComponent;
}(component_1.Component));
exports.FcRemoteInvokeComponent = FcRemoteInvokeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtcmVtb3RlLWludm9rZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L2ZjLXJlbW90ZS1pbnZva2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBNEI7QUFDNUIseUNBQXdDO0FBRXhDO0lBQTZDLDJDQUFTO0lBS3BELGlDQUFZLE1BQWMsRUFBRSxXQUFtQixFQUFFLE1BQWMsRUFBRSxPQUFlLEVBQUUsSUFBUyxFQUFFLFlBQW9CO1FBQWpILFlBQ0Usa0JBQU0sTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FJN0I7UUFIQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7SUFDdkIsQ0FBQztJQUVELGtEQUFnQixHQUFoQjtRQUNFLElBQU0sSUFBSSxHQUEyQixFQUFFLENBQUM7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBeEJELENBQTZDLHFCQUFTLEdBd0JyRDtBQXhCWSwwREFBdUIifQ==