export declare const genLayerCodeCachePath: (baseDir: any, serviceName: any, functionName: any) => string;
export declare function loadLayer({ credentials, region, layers, baseDir, runtime, serviceName, functionName, }: {
    credentials: any;
    region: any;
    layers: any;
    baseDir: any;
    runtime: any;
    serviceName: any;
    functionName: any;
}): Promise<void>;
