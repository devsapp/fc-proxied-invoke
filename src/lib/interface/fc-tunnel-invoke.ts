import {ServiceConfig} from "./fc-service";
import {FunctionConfig} from "./fc-function";
import {TriggerConfig} from "./fc-trigger";
import {CustomDomainConfig} from "./fc-custom-domain";


export interface IProperties {
    region: string;
    service: ServiceConfig;
    function: FunctionConfig;
    triggers: TriggerConfig[];
    customDomains: CustomDomainConfig[];
}
