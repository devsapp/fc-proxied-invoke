export declare const DOCKER_REGISTRIES: string[];
export declare function resolveImageNameForPull(imageName: string): Promise<string>;
export declare function resolveDockerUser({ nasConfig, stage }: {
    nasConfig: any;
    stage?: string;
}): string;
export declare function generateInstallOpts(imageName: string, mounts: any, envs: any): any;
export declare function transformMountsForToolbox(mounts: any): any;
export declare function transformPathForVirtualBox(source: any): string;
export declare function generateContainerNameFilter(containerName: string, inited?: boolean): string;
export declare function generateContainerName(serviceName: string, functionName: string, debugPort?: number): string;
export declare function generateLocalStartOpts(proxyContainerName: string, runtime: any, name: any, mounts: any, cmd: any, envs: any, limitedHostConfig: any, { debugPort, dockerUser, debugIde, imageName }: {
    debugPort: any;
    dockerUser: any;
    debugIde?: any;
    imageName: any;
}): Promise<any>;
export declare function resolveMockScript(runtime: string): string;
export declare function resolveDockerRegistry(): Promise<any>;
export declare function resolveDockerEnv(envs?: {}, isCustomContainer?: boolean): string[];
export declare function resolveRuntimeToDockerImage(runtime: string, isBuild?: boolean): Promise<string>;
