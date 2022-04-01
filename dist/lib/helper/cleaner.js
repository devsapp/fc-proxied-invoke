"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLEANERCONFIG = exports.CLEANER_VERSION = void 0;
var path_1 = __importDefault(require("path"));
var path_2 = require("../utils/path");
exports.CLEANER_VERSION = '0.0.3';
exports.CLEANERCONFIG = {
    serviceConfig: {
        name: '_FC_Session_Service_Cleaner',
    },
    functionConfig: {
        name: "cleaner_" + exports.CLEANER_VERSION.replace('.', '_').replace('.', '_'),
        description: 'The function for cleaning the closed sessions periodically.',
        runtime: 'nodejs12',
        handler: 'index.handler',
        memorySize: 128,
        timeout: 60,
    },
    triggerConfig: {
        triggerName: 'timerTrigger',
        triggerType: 'timer',
        triggerConfig: {
            // 每隔 5 分钟定时执行一次
            cronExpression: '@every 5m',
            enable: true,
            payload: '',
        },
    },
    zipFile: path_2.isNccPath(__dirname) ? path_1.default.join(__dirname, 'lib', 'helper', 'cleaner.zip') : path_1.default.join(__dirname, 'cleaner.zip'),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGVscGVyL2NsZWFuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOENBQXdCO0FBQ3hCLHNDQUEwQztBQUM3QixRQUFBLGVBQWUsR0FBRyxPQUFPLENBQUM7QUFDMUIsUUFBQSxhQUFhLEdBQUc7SUFDM0IsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLDZCQUE2QjtLQUNwQztJQUNELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxhQUFXLHVCQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBRztRQUN0RSxXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSxjQUFjO1FBQzNCLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLGFBQWEsRUFBRTtZQUNiLGdCQUFnQjtZQUNoQixjQUFjLEVBQUUsV0FBVztZQUMzQixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxFQUFFO1NBQ1o7S0FDRjtJQUNELE9BQU8sRUFBRSxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUM7Q0FDM0gsQ0FBQyJ9