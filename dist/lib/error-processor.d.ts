/// <reference types="node" />
import { Transform } from 'stream';
export declare class FilterChain {
    processors: Array<any>;
    constructor(options?: {});
    process(message: any, err?: any): Promise<boolean>;
}
declare class ChunkSplitTransform extends Transform {
    _buffer: string;
    _separator: string;
    constructor(options: any);
    _transform(chunk: any, encoding: any, done: any): void;
    _flush(done: any): void;
}
export declare function processorTransformFactory({ serviceName, functionName, errorStream }: {
    serviceName: any;
    functionName: any;
    errorStream: any;
}): ChunkSplitTransform;
export declare function processMakeHelperFunctionErr(e: any, retryTimes: number, assumeYes?: boolean): Promise<string>;
export {};
