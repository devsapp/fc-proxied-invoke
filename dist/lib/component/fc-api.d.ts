import { Component } from './component';
import { ServiceConfig } from '../interface/fc-service';
import { FunctionConfig } from '../interface/fc-function';
export declare class FcApiComponent extends Component {
    readonly serviceConf: ServiceConfig;
    readonly functionConf?: FunctionConfig;
    readonly region: string;
    constructor(region: string, access: string, appName: string, path: any, serviceConf: ServiceConfig, functionConf?: FunctionConfig);
    genComponentProp(): {
        [key: string]: any;
    };
}
