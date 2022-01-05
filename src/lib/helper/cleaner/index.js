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

      let res = await fcClient.listServices({ prefix: 'SESSION-', limit: 100});
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
              const serviceName = service.serviceName;
              const functionName = functions[0].functionName;
              // reset provision
              await fcClient.putProvisionConfig(serviceName, functionName, alias, { target: 0 });
              res = await fcClient.getProvisionConfig(serviceName, functionName, alias);

              // await provision reseted
              while (res.data.target !== 0 || res.data.current !== 0) {
                await fcClient.putProvisionConfig(serviceName, functionName, alias, { target: 0 });
                res = await fcClient.getProvisionConfig(serviceName, functionName, alias);
                await sleep(1000);
              }

              // remove triggers
              const triggerRes = await fcClient.listTriggers(service.serviceName, functions[0].functionName);
              for(let trigger of triggerRes.data.triggers) {
                await fcClient.deleteTrigger(service.serviceName, functions[0].functionName, trigger.triggerName);
              }
              
              // 删除弹性实例配置
              const method = 'DELETE';
              const path = `/services/${serviceName}.${alias}/functions/${functionName}/on-demand-config`;
              const elasticityRes = await fcClient.request(method, path, null, JSON.stringify({}));
              console.log(`On-demand config delete result: ${elasticityRes}`);

              // remove function and service
              if (res.data.target === 0 && res.data.current === 0) {
                await fcClient.deleteFunction(serviceName, functionName);
                await fcClient.deleteService(serviceName);
              }
            } catch (err) {
              console.log(err);
              retry(err);
            }
          }
        }
      }

      // 删除无效的端云联调产生的 custom domain
      let nextToken = null
      while(1){
        let options = { limit: 100 }
        if(nextToken) {
            options.nextToken = nextToken;
        }
        let res2 = await fcClient.listCustomDomains(options);
        nextToken = res2.data.nextToken;
        console.log(`nextToken=${res2.data.nextToken}`);
        for (let c of res2.data.customDomains) {
            const domainName = c.domainName;
            //console.log(domainName);
            if(domainName.endsWith('fc.devsapp.net') && domainName.includes('session-s-')){
                const srvName = domainName.split(".")[1]
                if(!srvName.startsWith('session-s-')){
                  continue;
                }
                try {
                  await fcClient.getService(srvName);
                } catch (error) { 
                // 如果不能 get 到对应的 service, 这个 custom domain 应该删除
                if(error.code === 'ServiceNotFound') {
                    console.log(`delete invalid custom domain: ${domainName}`);
                    await fcClient.deleteCustomDomain(domainName);
                  } 
                }
            }
        }
        if(nextToken === undefined || nextToken ===null){
            break;
        }
      }
    } catch (err) {
      console.log(err);
      retry(err);
    }
  });

  callback(null, '200');
};