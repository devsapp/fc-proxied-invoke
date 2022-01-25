export declare function resolveDockerUser({ nasConfig, stage }: {
    nasConfig: any;
    stage?: string;
}): string;
export declare function transformMountsForToolbox(mounts: any): any;
export declare function transformPathForVirtualBox(source: any): string;
export declare function generateLocalStartOpts(proxyContainerName: string, runtime: any, name: any, mounts: any, cmd: any, envs: any, limitedHostConfig: any, { debugPort, dockerUser, debugIde, imageName }: {
    debugPort: any;
    dockerUser: any;
    debugIde?: any;
    imageName: any;
}): Promise<any>;
export declare function resolveMockScript(runtime: string): string;
export declare function resolveDockerEnv(envs?: {}, isCustomContainer?: boolean): string[];
export declare function resolveRuntimeToDockerImage(runtime: string): Promise<string>;
