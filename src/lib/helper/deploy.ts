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
      logger.info(`Creating cleaner service...`);
      try {
        await client.createService(serviceConfig.name);
      } catch (e) {
        if (e.name === 'FCServiceAlreadyExistsError') {
          logger.debug(`Cleaner service already exist online.`);
        }
      }
      try {
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
      } catch (e) {
        if (e.name === 'FCFunctionAlreadyExistsError') {
          logger.debug(`Cleaner function already exist online.`);
        }
      }
      try {
        await client.createTrigger(serviceConfig.name, functionConfig.name, triggerConfig);
      } catch (e) {
        if (e.name === 'FCTriggerAlreadyExistsError') {
          logger.debug(`Cleaner trigger already exist online.`);
        }
      }
      await client.invokeFunction(serviceConfig.name, functionConfig.name, null);
    } catch (err) {
      logger.error(err);
      retry(err);
    }
  });
}
