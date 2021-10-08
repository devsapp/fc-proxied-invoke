import { InputProps } from '../../common/entity';
export declare abstract class Component {
    private readonly access;
    private readonly appName;
    private readonly path;
    constructor(access: string, appName: string, path: any);
    abstract genComponentProp(): any;
    genComponentInputs(componentName?: string, projectName?: string, args?: string, command?: string, credentials?: any, customDomains?: any): InputProps;
}
