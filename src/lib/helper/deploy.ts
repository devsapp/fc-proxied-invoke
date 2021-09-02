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
      const VERSION = CLEANERCONFIG.version.replace('.', '_').replace('.', '_');
      const functionName = `${functionConfig.name}_${VERSION}`

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
      
      // delete old version cleaner function if exists
      try {
        const res = await client.listFunctions(serviceConfig.name);
        if(res.data.functions.length > 0) {
          for(let func of res.data.functions) {
            const remoteFunctionName: string = func.functionName;
            if(remoteFunctionName !== functionName) {
              // remove trigger
              await client.deleteTrigger(serviceConfig.name, remoteFunctionName, triggerConfig.triggerName);
              // remove function
              await client.deleteFunction(serviceConfig.name, remoteFunctionName);
            }
          }
        }
      } catch (e) {
        logger.debug(e);
      }

      // setup new version cleaner function
      try {
        await client.createFunction(serviceConfig.name, {
          functionName: functionName,
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
        await client.createTrigger(serviceConfig.name, functionName, triggerConfig);
      } catch (e) {
        if (e.name === 'FCTriggerAlreadyExistsError') {
          logger.debug(`Cleaner trigger already exist online.`);
        }
      }
      await client.invokeFunction(serviceConfig.name, functionName, null);
    } catch (err) {
      logger.error(err);
      retry(err);
    }
  });
}
