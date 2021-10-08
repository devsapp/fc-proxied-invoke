import { Component } from './component';
import { ServiceConfig } from "../interface/fc-service";
import { FunctionConfig } from "../interface/fc-function";
import { TriggerConfig } from "../interface/fc-trigger";
import { CustomDomainConfig } from "../interface/fc-custom-domain";
export declare class FcDeployComponent extends Component {
    readonly serviceConf: ServiceConfig;
    readonly functionConf?: FunctionConfig;
    readonly region: string;
    readonly triggers?: TriggerConfig[];
    readonly customDomains?: CustomDomainConfig[];
    constructor(region: string, serviceConf: ServiceConfig, access: string, appName: string, path: any, functionConf?: FunctionConfig, triggerConfList?: TriggerConfig[], customDomainConfList?: CustomDomainConfig[]);
    genComponentProp(): {
        [key: string]: any;
    };
}
