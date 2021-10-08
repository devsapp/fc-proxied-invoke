export declare function getDebugOptions(argsData: any): any;
export declare function generateDockerDebugOpts(runtime: any, debugPort: any, debugIde: any): {
    ExposedPorts?: undefined;
    HostConfig?: undefined;
} | {
    ExposedPorts: {
        [x: string]: {};
    };
    HostConfig: {
        PortBindings: {
            [x: string]: {
                HostIp: string;
                HostPort: string;
            }[];
        };
    };
};
export declare function generateDebugEnv(runtime: any, debugPort: any, debugIde: any): {
    DEBUG_OPTIONS: string;
    XDEBUG_CONFIG?: undefined;
} | {
    DEBUG_OPTIONS?: undefined;
    XDEBUG_CONFIG?: undefined;
} | {
    XDEBUG_CONFIG: string;
    DEBUG_OPTIONS?: undefined;
};
export declare function generateVscodeDebugConfig(serviceName: any, functionName: any, runtime: any, codePath: any, debugPort: any): Promise<{
    version: string;
    configurations: {
        name: string;
        type: string;
        request: string;
        address: string;
        port: any;
        localRoot: string;
        remoteRoot: string;
        protocol: string;
        stopOnEntry: boolean;
    }[];
} | {
    version: string;
    configurations: {
        name: string;
        type: string;
        request: string;
        connect: {
            host: string;
            port: any;
        };
        pathMappings: {
            localRoot: string;
            remoteRoot: string;
        }[];
    }[];
} | {
    version: string;
    configurations: {
        name: string;
        type: string;
        request: string;
        hostName: string;
        port: any;
    }[];
} | {
    version: string;
    configurations: {
        name: string;
        type: string;
        request: string;
        port: any;
        stopOnEntry: boolean;
        pathMappings: {
            '/code': string;
        };
        ignore: string[];
    }[];
} | {
    version: string;
    configurations: {
        name: string;
        type: string;
        request: string;
        processName: string;
        pipeTransport: {
            pipeProgram: string;
            pipeArgs: string[];
            debuggerPath: string;
            pipeCwd: string;
        };
        windows: {
            pipeTransport: {
                pipeProgram: string;
                pipeArgs: string[];
                debuggerPath: string;
                pipeCwd: string;
            };
        };
        sourceFileMap: {
            '/code': any;
        };
    }[];
}>;
