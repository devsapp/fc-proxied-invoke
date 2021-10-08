export interface FunctionConfig {
    name: string;
    description?: string;
    codeUri?: string;
    originalCodeUri?: string;
    ossBucket?: string;
    ossKey?: string;
    caPort?: number;
    customContainerConfig?: CustomContainerConfig;
    handler?: string;
    memorySize?: number;
    runtime: string;
    timeout?: number;
    layers?: string[];
    environmentVariables?: {
        [key: string]: any;
    };
    initializationTimeout?: number;
    initializer?: string;
    instanceConcurrency?: number;
    instanceType?: string;
    import?: boolean;
    protect?: boolean;
    instanceLifecycleConfig?: InstanceLifecycleConfig;
    asyncConfiguration?: AsyncConfiguration;
}
export interface InstanceLifecycleConfig {
    preFreeze?: {
        handler?: string;
        timeout?: number;
    };
    preStop?: {
        handler?: string;
        timeout?: number;
    };
}
export interface AsyncConfiguration {
    destination: {
        OnSuccess: string;
        OnFailure: string;
    };
    maxAsyncEventAgeInSeconds: number;
    maxAsyncRetryAttempts: number;
    statefulInvocation: boolean;
}
export interface CustomContainerConfig {
    image: string;
    command?: string;
    args?: string;
}
