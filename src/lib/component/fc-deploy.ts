
import * as _ from 'lodash';
import { Component } from './component';
import {ServiceConfig} from "../interface/fc-service";
import {FunctionConfig} from "../interface/fc-function";
import {TriggerConfig} from "../interface/fc-trigger";
import {CustomDomainConfig} from "../interface/fc-custom-domain";

export class FcDeployComponent extends Component {
  readonly serviceConf: ServiceConfig;
  readonly functionConf?: FunctionConfig;
  readonly region: string;
  readonly triggers?: TriggerConfig[];
  readonly customDomains?: CustomDomainConfig[];

  constructor(region: string, serviceConf: ServiceConfig, access: string, appName: string, path: any, functionConf?: FunctionConfig, triggerConfList?: TriggerConfig[], customDomainConfList?: CustomDomainConfig[]) {
    super(access, appName, path);
    this.serviceConf = serviceConf;
    this.functionConf = functionConf;
    this.region = region;
    this.triggers = triggerConfList;
    this.customDomains = customDomainConfList;
  }


  genComponentProp(): { [key: string]: any } {
    const prop: { [key: string]: any } = {};
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
  }
}
