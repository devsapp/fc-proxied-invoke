'use strict';

const FCClient = require('@alicloud/fc2');
const Client = require('@alicloud/tunnel-service20210509');
const promise_retry = require('promise-retry');
const tunnerServiceHost = 'tunnel-service.cn-hangzhou.aliyuncs.com';
const descriptionPrefix = 'Auto generated proxied session: ';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function promiseRetry(fn, retries = 2) {
  const retryOptions = {
    retries: retries,
    factor: 2,
    minTimeout: 1 * 1000,
    randomize: true,
  };
  return promise_retry(fn, retryOptions);
}

exports.handler = async function (event, context, callback) {
  const credentials = {
    accessKeyId: process.env['AK_ID'],
    accessKeySecret: process.env['AK_SECRET'],
  };
  const alias = 'LATEST';

  await promiseRetry(async (retry, time) => {
    try {
      // create fc client
      const fcClient = new FCClient(context.accountId, {
        accessKeyID: credentials.accessKeyId,
        accessKeySecret: credentials.accessKeySecret,
        region: context.region,
        timeout: 60000,
      });

      // create tunnel client
      const client = new Client.default({
        accessKeyId: credentials.accessKeyId,
        accessKeySecret: credentials.accessKeySecret,
        regionId: context.region,
        endpoint: tunnerServiceHost,
      });

      let res = await fcClient.listServices({ prefix: 'SESSION-' });
      for (let service of res.data.services) {
        console.log(`detect session service ${service.serviceName}`);
        const functionRes = await fcClient.listFunctions(service.serviceName);
        const functions = functionRes.data.functions;
        if (functions.length === 1 && service.description.startsWith(descriptionPrefix)) {
          // the format of description is 'Auto generated proxied session: <sessionId>'
          let sessionId = service.description.substr(descriptionPrefix.length);
          let state = null;
          try {
            let res = await client.getSession(sessionId);
            state = res.body.data.status;
          } catch (err) {
            if (err.message.startsWith('SessionNotExists')) {
              state = 'NotExist';
            } else {
              console.log(`retry to get session states: ${time} times`);
              retry(err);
            }
          }
          console.log(`The state of session ${sessionId} is ${state}`);
          if (state === 'NotExist' || state === 'CLOSED') {
            console.log(`closing session service ${sessionId}`);
            try {
              // reset provision
              await fcClient.putProvisionConfig(service.serviceName, functions[0].functionName, alias, { target: 0 });
              res = await fcClient.getProvisionConfig(service.serviceName, functions[0].functionName, alias);

              // await provision reseted
              while (res.data.target !== 0 || res.data.current !== 0) {
                await fcClient.putProvisionConfig(service.serviceName, functions[0].functionName, alias, { target: 0 });
                res = await fcClient.getProvisionConfig(service.serviceName, functions[0].functionName, alias);
                await sleep(1000);
              }

              // remove triggers
              const triggerRes = await fcClient.listTriggers(service.serviceName, functions[0].functionName);
              for(let trigger of triggerRes.data.triggers) {
                await fcClient.deleteTrigger(service.serviceName, functions[0].functionName, trigger.triggerName);
              }

              // remove function and service
              if (res.data.target === 0 && res.data.current === 0) {
                await fcClient.deleteFunction(service.serviceName, functions[0].functionName);
                await fcClient.deleteService(service.serviceName);
              }
            } catch (err) {
              console.log(err);
              retry(err);
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      retry(err);
    }
  });

  callback(null, '200');
};
