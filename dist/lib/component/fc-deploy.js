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
exports.FcDeployComponent = void 0;
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var FcDeployComponent = /** @class */ (function (_super) {
    __extends(FcDeployComponent, _super);
    function FcDeployComponent(region, serviceConf, access, appName, path, functionConf, triggerConfList, customDomainConfList) {
        var _this = _super.call(this, access, appName, path) || this;
        _this.serviceConf = serviceConf;
        _this.functionConf = functionConf;
        _this.region = region;
        _this.triggers = triggerConfList;
        _this.customDomains = customDomainConfList;
        return _this;
    }
    FcDeployComponent.prototype.genComponentProp = function () {
        var prop = {};
        if (!_.isEmpty(this.serviceConf)) {
            Object.assign(prop, { service: this.serviceConf });
        }
        if (!_.isEmpty(this.functionConf)) {
            Object.assign(prop, { function: this.functionConf });
        }
        if (!_.isEmpty(this.triggers)) {
            Object.assign(prop, { triggers: this.triggers });
        }
        if (!_.isEmpty(this.customDomains)) {
            Object.assign(prop, { customDomains: this.customDomains });
        }
        Object.assign(prop, { region: this.region });
        return prop;
    };
    return FcDeployComponent;
}(component_1.Component));
exports.FcDeployComponent = FcDeployComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZmMtZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0NBQTRCO0FBQzVCLHlDQUF3QztBQU14QztJQUF1QyxxQ0FBUztJQU85QywyQkFBWSxNQUFjLEVBQUUsV0FBMEIsRUFBRSxNQUFjLEVBQUUsT0FBZSxFQUFFLElBQVMsRUFBRSxZQUE2QixFQUFFLGVBQWlDLEVBQUUsb0JBQTJDO1FBQWpOLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FNN0I7UUFMQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixLQUFJLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQztRQUNoQyxLQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDOztJQUM1QyxDQUFDO0lBR0QsNENBQWdCLEdBQWhCO1FBQ0UsSUFBTSxJQUFJLEdBQTJCLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDbEQ7UUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7U0FDNUQ7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFuQ0QsQ0FBdUMscUJBQVMsR0FtQy9DO0FBbkNZLDhDQUFpQiJ9