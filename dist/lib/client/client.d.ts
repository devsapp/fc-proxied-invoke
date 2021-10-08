import Pop from '@alicloud/pop-core';
import { ICredentials } from "../../common/entity";
export declare class AlicloudClient {
    private readonly timeout?;
    private readonly credentials;
    constructor(creds: ICredentials, timeout?: number);
    getPopClient(endpoint: string, apiVersion?: string): Promise<Pop>;
    getFcClient(region: string): Promise<any>;
}
