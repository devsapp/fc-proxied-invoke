import { lodash as _ } from '@serverless-devs/core';
import { Component } from './component';
import { ServiceConfig } from '../interface/fc-service';
import { FunctionConfig } from '../interface/fc-function';

export class FcApiComponent extends Component {
  readonly serviceConf: ServiceConfig;
  readonly functionConf?: FunctionConfig;
  readonly region: string;

  constructor(region: string, access: string, appName: string, path: any, serviceConf: ServiceConfig, functionConf?: FunctionConfig) {
    super(access, appName, path);
    this.serviceConf = serviceConf;
    this.functionConf = functionConf;
    this.region = region;
  }

  genComponentProp(): { [key: string]: any } {
    const prop: { [key: string]: any } = {};
    Object.assign(prop, { region: this.region });

    if (!_.isEmpty(this.serviceConf)) {
      Object.assign(prop, { service: this.serviceConf });
    }
    if (!_.isEmpty(this.functionConf)) {
      Object.assign(prop, { function: this.functionConf });
    }

    return prop;
  }
}
