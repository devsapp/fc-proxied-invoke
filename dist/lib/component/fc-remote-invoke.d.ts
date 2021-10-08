import { Component } from './component';
export declare class FcRemoteInvokeComponent extends Component {
    readonly serviceName: string;
    readonly functionName: string;
    readonly region: string;
    constructor(region: string, serviceName: string, access: string, appName: string, path: any, functionName: string);
    genComponentProp(): {
        [key: string]: any;
    };
}
