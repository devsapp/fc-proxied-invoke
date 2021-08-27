import fs from 'fs';
import logger from '../../common/logger';
import { CLEANERCONFIG } from './cleaner';
import { ServiceConfig } from '../interface/fc-service';
import { FunctionConfig } from '../interface/fc-function';
import { ICredentials } from '../../common/entity';
import { promiseRetry } from '../retry';

export async function deployCleaner(client: any, credentials: ICredentials) {
  await promiseRetry(async (retry: any, times: number): Promise<any> => {
    try {
      let serviceConfig: ServiceConfig = CLEANERCONFIG.serviceConfig;
      let functionConfig: FunctionConfig = CLEANERCONFIG.functionConfig;
      let triggerConfig: any = CLEANERCONFIG.triggerConfig;

      // add ak to function env
      Object.assign(functionConfig, {
        environmentVariables: {
          AK_ID: credentials?.AccessKeyID,
          AK_SECRET: credentials?.AccessKeySecret,
          AK_SECRET_TOKEN: credentials?.SecurityToken,
        },
      });
      logger.info(`checking cleaner service exist...`);
      try {
        await client.createService(serviceConfig.name);
      } catch (e) {
        if (e.name === 'FCServiceAlreadyExistsError') {
          return;
        } 
      }

      await client.createFunction(serviceConfig.name, {
        functionName: functionConfig.name,
        description: functionConfig.description,
        handler: functionConfig.handler,
        memorySize: functionConfig.memorySize,
        runtime: functionConfig.runtime,
        timeout: functionConfig.timeout,
        environmentVariables: functionConfig.environmentVariables,
        code: {
          zipFile: fs.readFileSync(CLEANERCONFIG.zipFile, 'base64'),
        },
      });
      await client.createTrigger(serviceConfig.name, functionConfig.name, triggerConfig);
      await client.invokeFunction(serviceConfig.name, functionConfig.name, null);
    } catch (err) {
      logger.error(err);
      retry(err);
    }
  });
}
