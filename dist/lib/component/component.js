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
exports.Component = void 0;
var _ = __importStar(require("lodash"));
var logger_1 = __importDefault(require("../../common/logger"));
var Component = /** @class */ (function () {
    function Component(access, appName, path) {
        this.access = access;
        this.appName = appName;
        this.path = path;
    }
    Component.prototype.genComponentInputs = function (componentName, projectName, args, command, credentials, customDomains) {
        var _a;
        var props = this.genComponentProp();
        if (!_.isEmpty(customDomains)) {
            props.domainName = customDomains[0].domainName;
        }
        logger_1.default.debug("props: " + props);
        var inputProps = {
            props: props,
            appName: this.appName,
            project: {
                component: componentName,
                access: this.access,
                projectName: projectName
            },
            path: this.path,
        };
        if (!_.isNil(args)) {
            Object.assign(inputProps, { args: args });
        }
        if (!_.isNil(command)) {
            Object.assign(inputProps, { command: command });
        }
        if (!_.isNil(credentials)) {
            Object.assign(inputProps, { credentials: credentials });
        }
        logger_1.default.debug("inputs of component: " + ((_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps.project) === null || _a === void 0 ? void 0 : _a.component) + " generated: \n" + JSON.stringify(inputProps, null, '  '));
        return inputProps;
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBNEI7QUFFNUIsK0RBQXlDO0FBRXpDO0lBS0UsbUJBQVksTUFBYyxFQUFFLE9BQWUsRUFBRSxJQUFTO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFJRCxzQ0FBa0IsR0FBbEIsVUFBbUIsYUFBc0IsRUFBRSxXQUFvQixFQUFFLElBQWEsRUFBRSxPQUFnQixFQUFFLFdBQWlCLEVBQUUsYUFBbUI7O1FBQ3RJLElBQUksS0FBSyxHQUFRLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3pDLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzVCLEtBQUssQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztTQUNoRDtRQUNELGdCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVUsS0FBTyxDQUFDLENBQUM7UUFDaEMsSUFBTSxVQUFVLEdBQWU7WUFDN0IsS0FBSyxPQUFBO1lBQ0wsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsYUFBYTtnQkFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixXQUFXLEVBQUUsV0FBVzthQUN6QjtZQUNELElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNoQixDQUFDO1FBRUYsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsV0FBVyxhQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsaUNBQXdCLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxPQUFPLDBDQUFFLFNBQVMsdUJBQWlCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUcsQ0FBQyxDQUFDO1FBQzlILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUEzQ0QsSUEyQ0M7QUEzQ3FCLDhCQUFTIn0=