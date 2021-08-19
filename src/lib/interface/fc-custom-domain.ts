export interface CustomDomainConfig {
    domainName: string;
    protocol: 'HTTP' | 'HTTP,HTTPS';
    routeConfigs: RouteConfig[];
    certConfig?: CertConfig;
}

export interface RouteConfig {
    path: string;
    serviceName?: string;
    functionName?: string;
    qualifier?: string;
    methods?: string[];
}

interface CertConfig {
    certName: string;
    certificate: string;
    privateKey: string;
}
