export declare const CLEANER_VERSION = "0.0.3";
export declare const CLEANERCONFIG: {
    serviceConfig: {
        name: string;
    };
    functionConfig: {
        name: string;
        description: string;
        runtime: string;
        handler: string;
        memorySize: number;
        timeout: number;
    };
    triggerConfig: {
        triggerName: string;
        triggerType: string;
        triggerConfig: {
            cronExpression: string;
            enable: boolean;
            payload: string;
        };
    };
    zipFile: string;
};
