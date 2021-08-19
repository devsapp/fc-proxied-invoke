import {LogConfig} from "./sls";
import {RoleConfig} from "./ram";
import {VpcConfig} from "./vpc";
import {NasConfig} from "./nas";

export interface ServiceConfig {
    name: string;
    description?: string;
    internetAccess?: boolean;
    logConfig?: LogConfig | 'auto' | 'Auto';
    role?: string | RoleConfig;
    vpcConfig?: VpcConfig | 'auto' | 'Auto';
    nasConfig?: NasConfig | 'atuo' | 'Auto';
}







