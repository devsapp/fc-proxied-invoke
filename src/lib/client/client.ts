import Pop from '@alicloud/pop-core';
import { throwProcessedPopPermissionError, throwProcessedFCPermissionError } from '../error';
import * as _ from 'lodash';
import {ICredentials} from "../../common/entity";
import osLocale from 'os-locale';
import {isNccPath} from "../utils/path";
const FC = require('@alicloud/fc2');
const hashedMachineId = require('node-machine-id').machineId;
import p from "path";

let pkg;

if (isNccPath(__dirname)) {
  pkg = require(p.join(p.resolve(__dirname, '../'), 'package.json'));
} else {
  pkg = require(p.join(p.resolve(__dirname, '../../..'), 'package.json'));
}

const defaultTimeout = 300;

export class AlicloudClient {
  private readonly timeout?: number;
  private readonly credentials: ICredentials;

  constructor(creds: ICredentials, timeout?: number) {
    this.credentials = creds;
    if (!_.isNil(timeout)) { this.timeout = timeout; }
  }

  async getPopClient(endpoint: string, apiVersion?: string): Promise<Pop> {
    const config: any = {
      endpoint,
      accessKeyId: this.credentials?.AccessKeyID,
      accessKeySecret: this.credentials?.AccessKeySecret,
      opts: {
        timeout: this.timeout || defaultTimeout * 1000,
      },
    };
    if (!_.isNil(apiVersion)) {
      Object.assign(config, { apiVersion });
    }
    if (!_.isNil(this.credentials?.SecurityToken)) {
      Object.assign(config, { securityToken: this.credentials?.SecurityToken });
    }
    const pop = new Pop(config);

    const realRequest = pop.request.bind(pop);
    pop.request = async (action, params, options) => {
      try {
        return await realRequest(action, params, options);
      } catch (ex) {
        throwProcessedPopPermissionError(ex, action);
        throw ex;
      }
    };

    return pop;
  }

  async getFcClient(region: string): Promise<any> {
    const locale: string = await osLocale();

    const mid = await hashedMachineId();

    FC.prototype.getAccountSettings = function (options = {}, headers = {}) {
      return this.get('/account-settings', options, headers);
    };

    const accountId: string = this.credentials?.AccountID ? this.credentials?.AccountID : 'accountId';
    const accessKeyID: string = this.credentials?.AccessKeyID ? this.credentials?.AccessKeyID : 'accessKeyID';
    const accessKeySecret: string = this.credentials?.AccessKeySecret ? this.credentials?.AccessKeySecret : 'accessKeySecret';
    const securityToken: string = this.credentials?.SecurityToken;

    // TODO: get user profile
    // const enable = profile.enableCustomEndpoint === true || profile.enableCustomEndpoint === 'true';
    // const endpoint = profile.fcEndpoint ? profile.fcEndpoint : (enable ? profile.endpoint : undefined);
    const fc: any = new FC(accountId, {
      accessKeyID,
      accessKeySecret,
      securityToken,
      region: region,
      timeout: this.timeout || defaultTimeout * 1000,
      // secure: profile.protocol !== 'http',
      headers: {
        'user-agent': `${pkg.name}/v${pkg.version} ( Node.js ${process.version}; OS ${process.platform} ${process.arch}; language ${locale}; mid ${mid})`,
      },
    });
    const realRequest: any = fc.request.bind(fc);
    fc.request = async (method, path, query, body, headers, opts = {}) => {
      try {
        return await realRequest(method, path, query, body, headers || {}, opts || {});
      } catch (ex) {
        throwProcessedFCPermissionError(ex, region, ...path.split('/').filter((singlep) => !!singlep));
        throw ex;
      }
    };

    return fc;
  }

}

