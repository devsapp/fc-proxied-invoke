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
exports.FcApiComponent = void 0;
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var FcApiComponent = /** @class */ (function (_super) {
    __extends(FcApiComponent, _super);
    function FcApiComponent(region, access, appName, path, serviceConf, functionConf) {
        var _this = _super.call(this, access, appName, path) || this;
        _this.serviceConf = serviceConf;
        _this.functionConf = functionConf;
        _this.region = region;
        return _this;
    }
    FcApiComponent.prototype.genComponentProp = function () {
        var prop = {};
        Object.assign(prop, { region: this.region });
        if (!_.isEmpty(this.serviceConf)) {
            Object.assign(prop, { service: this.serviceConf });
        }
        if (!_.isEmpty(this.functionConf)) {
            Object.assign(prop, { function: this.functionConf });
        }
        return prop;
    };
    return FcApiComponent;
}(component_1.Component));
exports.FcApiComponent = FcApiComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZmMtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBQzVCLHlDQUF3QztBQUl4QztJQUFvQyxrQ0FBUztJQUszQyx3QkFBWSxNQUFjLEVBQUUsTUFBYyxFQUFFLE9BQWUsRUFBRSxJQUFTLEVBQUUsV0FBMEIsRUFBRSxZQUE2QjtRQUFqSSxZQUNFLGtCQUFNLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBSTdCO1FBSEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEI7UUFDRSxJQUFNLElBQUksR0FBMkIsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUN0RDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQXpCRCxDQUFvQyxxQkFBUyxHQXlCNUM7QUF6Qlksd0NBQWMifQ==