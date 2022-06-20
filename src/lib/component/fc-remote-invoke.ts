import { lodash as _ } from '@serverless-devs/core';
import { Component } from './component';

export class FcRemoteInvokeComponent extends Component {
  readonly serviceName: string;
  readonly functionName: string;
  readonly region: string;

  constructor(region: string, serviceName: string, access: string, appName: string, path: any, functionName: string) {
    super(access, appName, path);
    this.serviceName = serviceName;
    this.functionName = functionName;
    this.region = region;
  }

  genComponentProp(): { [key: string]: any } {
    const prop: { [key: string]: any } = {};
    Object.assign(prop, { region: this.region });
    if (!_.isEmpty(this.serviceName)) {
      Object.assign(prop, { serviceName: this.serviceName });
    }
    if (!_.isEmpty(this.functionName)) {
      Object.assign(prop, { functionName: this.functionName });
    }

    return prop;
  }
}
