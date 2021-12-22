export function isCustomContainerRuntime(runtime: string): boolean {
    return runtime === 'custom-container';
}

export function isCustomRuntime(runtime: string): boolean {
    return runtime === 'custom';
}
