import logger from '../common/logger';
import * as core from '@serverless-devs/core';
import { Session } from './interface/session';
import {ICredentials, InputProps} from "../common/entity";
import {AlicloudClient} from "./client/client";
import {ServiceConfig} from "./interface/fc-service";
import {FunctionConfig} from "./interface/fc-function";
import * as YAML from 'js-yaml';
import {FcDeployComponent} from "./component/fc-deploy";
import { sleep } from './utils/time';
import {pullImageIfNeed, runContainer, stopContainer} from "./docker/docker";
import nestedObjectAssign from 'nested-object-assign';
import {mark} from "./utils/utils";
import * as path from 'path';
import * as os from 'os';
import * as fse from 'fs-extra';
import Container from 'dockerode';
import {
    GetSessionResponse,
    CreateSessionRequest,
    CreateSessionResponse,
    CreateSessionResponseBodyData,
    DeleteSessionResponse,
    DeleteSessionResponseBody
} from '@alicloud/tunnel-service20210509';
import Client from '@alicloud/tunnel-service20210509';
import {TriggerConfig} from "./interface/fc-trigger";
import {genProxyContainerName, getHttpTrigger} from "./definition";
import {setSigint} from "./utils/process";
import {writeEventToStreamAndClose} from "./utils/stream";
import {CustomDomainConfig, RouteConfig} from "./interface/fc-custom-domain";
import {FcRemoteInvokeComponent} from "./component/fc-remote-invoke";
import {setKVInState, unsetKVInState} from "./utils/devs";
import Docker from 'dockerode';
import {isCustomContainerRuntime, isCustomRuntime} from "./utils/runtime";
import StdoutFormatter from "./component/stdout-formatter";
import {processMakeHelperFunctionErr} from "./error-processor";
import {promiseRetry} from "./retry";
import { getHelperConfigFromState, getProxyContainerIdFromState, getSessionFromState, getInvokeContainerIdFromState, unsetInvokeContainerId } from './utils/state';
import { FcApiComponent } from './component/fc-api'
import { deployCleaner } from './helper/deploy';
import { isDeleteOssTriggerAndContinue } from './prompt'

const _ = core.lodash;
const docker: any = new Docker();
const IDE_PYCHARM: string = 'pycharm';

export default class TunnelService {
    private readonly credentials: ICredentials;
    private readonly region: string;
    private readonly userServiceConfig: ServiceConfig;
    private readonly userFunctionConfig: FunctionConfig;
    private readonly userTriggerConfigList: TriggerConfig[];
    private readonly userCustomDomainConfigList: CustomDomainConfig[];
    private readonly access: string;
    private readonly appName: string;
    private readonly path: any;
    private readonly debugPort?: number;
    private readonly debugIde?: string;
    private memorySize?: number;
    private client: Client;
    private fcClient: any;
    private session: Session;

    private static readonly maxRetryCnt: number = 40;
    private static readonly tunnerServiceHost: string = 'tunnel-service.cn-hangzhou.aliyuncs.com';
    // private static defaultFunctionImage: string = `registry.${TunnelService.defaultRegion}.aliyuncs.com/aliyunfc/ts-remote:v0.2`;
    private static readonly proxyImageName: string = 'ts-local';
    private static readonly proxyImageStableVersion: string = 'v0.1.1';
    private static readonly helperImageStableVersion: string = 'v0.1.2'
    private static readonly helperImageVersion: string = process.env['TUNNEL_SERVICE_HELPER_IMAGE_LATEST_VERSION'] || TunnelService.helperImageStableVersion;
    private static readonly proxyImageVersion: string = process.env['TUNNEL_SERVICE_PROXY_IMAGE_LATEST_VERSION'] || TunnelService.proxyImageStableVersion;
    private static readonly proxyImageRepo: string = 'aliyunfc';
    private static readonly proxyImaggeRegistry: string = 'registry.cn-hangzhou.aliyuncs.com';
    private static readonly cacheDirPath: string = path.join(os.homedir(), '.s', 'cache', 'fc-tunnel-invoke');
    private static readonly runtimeListNeedSetTsAdjustFLag: string[] = ['nodejs', 'python', 'php', 'java'];

    private runner: any;
    private streamOfRunner: any;
    private stdoutFileWriteStream: any;
    private stderrFileWriteStream: any;
    private assumeYes: boolean

    constructor(credentials: ICredentials, userServiceConfig: ServiceConfig, userFunctionConfig: FunctionConfig, region: string, access: string, appName: string, path: any, userTriggerConfigList?: TriggerConfig[], userCustomDomainConfigList?: CustomDomainConfig[], debugPort?: number, debugIde?: string, memorySize?: number, assumeYes?: boolean) {
        this.credentials = credentials;
        this.userServiceConfig = userServiceConfig;
        this.userFunctionConfig = userFunctionConfig;
        this.userTriggerConfigList = userTriggerConfigList;
        this.userCustomDomainConfigList = userCustomDomainConfigList;

        this.debugPort = debugPort;
        this.debugIde = debugIde;
        this.region = region;
        this.access = access;
        this.appName = appName;
        this.path = path;
        this.memorySize = memorySize;
        this.assumeYes = assumeYes;
        const config: any = {
            accessKeyId: this.credentials?.AccessKeyID,
            accessKeySecret: this.credentials?.AccessKeySecret,
            regionId: this.region,
            endpoint: TunnelService.tunnerServiceHost
        };
        this.client = new Client(config);
        setSigint();
        // exit container, when use ctrl + c
        process.on('SIGINT', async () => {
            // end stream
            if (this.streamOfRunner) {
                writeEventToStreamAndClose(this.streamOfRunner);
            }
            // destroy container
            if (this.runner) {
                logger.info(`Received canncel request, stopping running proxy container.....`);
                await stopContainer(this.runner);
                await this.unsetProxyContainerId();
            }
            // close file stream
            const { stdoutFilePath, stderrFilePath } = this.genOutputFileOfProxyContainer();
            if (this.stdoutFileWriteStream) {
                this.stdoutFileWriteStream.close((err) => {
                    if (err) {
                        logger.warning(`Close stdout file of proxy container: ${stdoutFilePath} failed!\nError: ${err}`);
                    }
                });
            }
            if (this.stderrFileWriteStream) {
                this.stderrFileWriteStream.close((err) => {
                    if (err) {
                        logger.warning(`Close stderr file of proxy container: ${stderrFilePath} failed!\nError: ${err}`);
                    }
                });
            }
        });
    }

    public async setup(): Promise<any> {
        // create client
        const alicloudClient: AlicloudClient = new AlicloudClient(this.credentials);
        this.fcClient = await alicloudClient.getFcClient(this.region);

        const createSessionVm: any = core.spinner(`Creating session...`);
        try {
            await promiseRetry(async (retry: any, times: number): Promise<any> => {
                try {
                    this.session  = await this.createSession();
                    createSessionVm.succeed(`Session created, session id: ${this.session.sessionId}.`);
                    await this.saveSession();
                    return;
                } catch (ex) {
                    if (ex.toString().includes('code: 403, You do not have permission to perform this operation')) {
                        const policy = {
                            "Statement": [
                                {
                                    "Effect": "Allow",
                                    "Action": "tns:*",
                                    "Resource": "*"
                                }
                            ],
                            "Version": "1"
                        }
                        logger.error("Your access must attch a RAM policy as follow:");
                        console.log('\x1b[35m%s\x1b[0m', JSON.stringify(policy, null, 4));
                        throw ex;
                    }
                    logger.debug(`Create session failed, error is: \n${ex}`);
                    logger.info(StdoutFormatter.stdoutFormatter.retry('session', 'create', '', times));
                    retry(ex);
                }
            });
        } catch (e) {
            createSessionVm.fail(`Create session failed.`);
            throw e;
        }
        // TODO: empty sessioin

        logger.info(`Deploying helper function...`);
        await this.makeCleanerFunction();
        await this.makeHelperFunction();


        const proxyContainerVm: any = core.spinner(`Starting proxy container...`);
        try {
            await this.runProxyContainer(proxyContainerVm);
            proxyContainerVm.succeed(`Proxy container is running.`);
        } catch (e) {
            proxyContainerVm.fail(`Start proxy container failed.`);
            throw e;
        }
        const checkVm: any = core.spinner(`Checking if session is established...`);
        try {
            await this.queryUntilSessionEstablished();
            checkVm.succeed(`Session established!`);
        } catch (e) {
            checkVm.fail(`Session establish fail.`);
            // TODO: clean 操作
            throw e;
        }
    }

    private async makeCleanerFunction() {
        if (!this.fcClient) {
          const alicloudClient: AlicloudClient = new AlicloudClient(this.credentials);
          this.fcClient = await alicloudClient.getFcClient(this.region);
        }
        await deployCleaner(this.fcClient, this.credentials);
    }

    private generateSessionName(): string {
        return `session_${this.region}_${this.userServiceConfig.name}`
    }

    private async cleanFunctionContainer(): Promise<void> {
        const invokeContainerId: string = await getInvokeContainerIdFromState(this.credentials?.AccountID, this.region, this.userServiceConfig?.name, this.userFunctionConfig?.name);
        const container: Container = await docker.getContainer(invokeContainerId);
        await stopContainer(container);
        await unsetInvokeContainerId(this.credentials?.AccountID, this.region, this.userServiceConfig?.name, this.userFunctionConfig?.name);
    }

    private async createSession(): Promise<Session> {
        const sessionName: string = this.generateSessionName();
        const req: CreateSessionRequest = new CreateSessionRequest({ sessionName });
        logger.debug(`Session name is : ${sessionName}`);

        const res: CreateSessionResponse = await this.client.createSession(req);
        // TODO: judge if the code of response is 200
        const data: CreateSessionResponseBodyData = res?.body?.data;
        logger.debug(`Create session result data: ${JSON.stringify(data, null, '  ')}`);
        return {
            name: data?.sessionName,
            sessionId: data?.sessionId,
            localInstanceId: data?.localInstanceId,
            remoteInstanceId: data?.remoteInstanceId
        };
    }

    private async deleteSession(sessionId: string): Promise<void> {
        const res: DeleteSessionResponse = await this.client.deleteSession(sessionId);
        const body: DeleteSessionResponseBody = res?.body;
        logger.debug(`Delete session body: ${JSON.stringify(body, null, '  ')}`);
    }

    private genHelperServiceConfig(): ServiceConfig {
        const helperServiceConfig: ServiceConfig = _.cloneDeep(this.userServiceConfig);
        helperServiceConfig.name = `SESSION-${this.session?.sessionId.substring(0, 7)}`;
        // 添加 description
        helperServiceConfig.description = `Auto generated proxied session: ${this.session?.sessionId}`;
        // 开启公网访问
        helperServiceConfig.internetAccess = true;
        // 删除 nas 配置
        // if (isAutoConfig(helperServiceConfig?.nasConfig)) { delete helperServiceConfig.nasConfig; }
        delete helperServiceConfig.nasConfig;

        // 删除 auto 的 logconfig 配置
        if(helperServiceConfig.logConfig && (helperServiceConfig.logConfig === 'auto' || helperServiceConfig.logConfig === 'Auto')) {
            delete helperServiceConfig.logConfig;
        }
        return helperServiceConfig;
    }

    private genHelperFunctionConfig(): FunctionConfig {
        const helperFunctionConfig: FunctionConfig = {
            name: this.userFunctionConfig?.name,
            description: `Helper function generated by fc-tunnel-invoke component`,
            runtime: 'custom-container',
            handler: this.userFunctionConfig?.handler,
            timeout: 600,
            memorySize: this.memorySize || 128,
            customContainerConfig: {
                image: `registry.${this.region}.aliyuncs.com/aliyunfc/ts-remote:${TunnelService.helperImageVersion}`
            },
            environmentVariables: {
                'TUNNEL_SERVICE_HOST': TunnelService.tunnerServiceHost,
                'TUNNEL_SERVICE_INSTANCE_ID': this.session?.remoteInstanceId,
                'TUNNEL_SERVICE_SESSION_ID': this.session?.sessionId,
                'TUNNEL_SERVICE_AK_ID': this.credentials?.AccessKeyID,
                'TUNNEL_SERVICE_AK_SECRET': this.credentials?.AccessKeySecret
            }
        };
        // Add TS_DEBUG_HTTP_TRIGGER_ADJUST env for nodejs/python/php/java http trigger
        if (!_.isEmpty(getHttpTrigger(this.userTriggerConfigList))) {
            TunnelService.runtimeListNeedSetTsAdjustFLag.forEach((runtime) => {
                if (this.userFunctionConfig?.runtime.indexOf(runtime) !== -1) {
                    Object.assign(helperFunctionConfig.environmentVariables, {
                        'TS_DEBUG_HTTP_TRIGGER_ADJUST': true
                    });
                }
            });
        }
        if (this.userFunctionConfig?.initializationTimeout && this.userFunctionConfig?.initializer) {
            Object.assign(helperFunctionConfig, {
                initializationTimeout: this.userFunctionConfig?.initializationTimeout,
                initializer: this.userFunctionConfig?.initializer,
            });
        }
        if (this.userFunctionConfig?.instanceLifecycleConfig) {
            Object.assign(helperFunctionConfig, {
                instanceLifecycleConfig: this.userFunctionConfig?.instanceLifecycleConfig,
            });
        }
        if (this.userFunctionConfig?.instanceConcurrency) {
            Object.assign(helperFunctionConfig, {
                instanceConcurrency: this.userFunctionConfig?.instanceConcurrency
            })
        }
        if (this.userFunctionConfig?.asyncConfiguration) {
            Object.assign(helperFunctionConfig, {
                asyncConfiguration: this.userFunctionConfig?.asyncConfiguration
            })
        }

        return helperFunctionConfig;
    }

    private async genHelperCustomDomainConfig(): Promise<CustomDomainConfig[]> {
        if (_.isEmpty(this.userCustomDomainConfigList)) { return []; }
        let customDomainConfigList: CustomDomainConfig[] = [];
        for (const userDomain of this.userCustomDomainConfigList) {
            const routeConfigList: RouteConfig[] = userDomain?.routeConfigs.map((useRouter) => {
                if (useRouter?.serviceName && useRouter?.serviceName === this.userServiceConfig?.name &&
                    useRouter?.functionName && useRouter?.functionName === this.userFunctionConfig?.name) {
                    const router: RouteConfig = _.cloneDeep(useRouter);
                    delete router?.serviceName;
                    delete router?.functionName;
                    return router;
                }
                if (!useRouter?.serviceName && !useRouter?.functionName) { return useRouter; }
            });
            const domain: CustomDomainConfig = {
                domainName: userDomain?.domainName,
                protocol: userDomain?.protocol,
                routeConfigs: routeConfigList.filter((r) => (r)),
            }
            // 如果是 auto，自动生成的域名， 不是使用代理 service 和 function 生成的 domain
            // 而是固定的， 使用 s.yaml 本身 service 和 function 生成 domain
            if (domain.domainName.toLowerCase() === 'auto'){
                const fcDomain = await core.loadComponent('devsapp/domain');
                let inputs = {
                    credentials: this.credentials,
                    props: {
                        type: 'fc',
                        user: this.credentials.AccountID,
                        region: this.region,
                        service: this.userServiceConfig.name,
                        function: this.userFunctionConfig.name
                    },
                    project: {
                        access: this.access
                    }
                };
                logger.debug(`get proxy function inputs = ${inputs}`);
                const domainName = await fcDomain.get(inputs);
                domain.domainName = domainName;
            }
            if (userDomain?.certConfig) {
                Object.assign(domain, {
                    certConfig: domain?.certConfig
                });
            }
            console.log('\x1b[35m%s\x1b[0m', `[FC-PROXIED-INVOKE] get helper function ${this.userServiceConfig.name}/${this.userFunctionConfig.name} domainName: ${domain.domainName}`); 
            customDomainConfigList.push(domain);
        }
        return customDomainConfigList;
    }

    private async makeHelperFunction(): Promise<any> {
        const helperServiceConfig: ServiceConfig = this.genHelperServiceConfig();
        const helperFunctionConfig: FunctionConfig = this.genHelperFunctionConfig();
        // TODO: 删除指定版本的触发器
        const helperTriggerConfigList: TriggerConfig[] = this.userTriggerConfigList;
        const helperCustomDomainConfigList: CustomDomainConfig[] = await this.genHelperCustomDomainConfig();
        const fcDeployComponent: FcDeployComponent = new FcDeployComponent(this.region, helperServiceConfig, this.access, this.appName, this.path, helperFunctionConfig, helperTriggerConfigList, helperCustomDomainConfigList);
        const fcDeployComponentInputs: InputProps = fcDeployComponent.genComponentInputs('fc-deploy', 'fc-deploy-project', '--use-local', 'deploy');
        const fcDeployComponentIns: any = await core.loadComponent(`devsapp/fc-deploy`);
        
        await promiseRetry(async (retry: any, times: number): Promise<any> => {
            try {
                const deployRes: any = await fcDeployComponentIns.deploy(fcDeployComponentInputs);
                await this.saveHelperFunctionDeployRes(deployRes);
                // 配置预留之前需要调用一下函数 https://github.com/devsapp/fc/issues/664#issuecomment-1073710622
                try {
                    const alicloudClient: AlicloudClient = new AlicloudClient(this.credentials);
                    this.fcClient = await alicloudClient.getFcClient(this.region);
                    await this.fcClient.invokeFunction(helperServiceConfig.name, helperFunctionConfig.name, '');
                } catch (_ex) { /* 不阻塞主进程 */ }

                // 设置函数预留为 1，弹性为 0
                const setHelperVm: any = core.spinner(`Setting helper function with 1 provison and 0 elasticity`);
                try {
                    await this.setHelperFunctionConfig(helperServiceConfig.name, helperFunctionConfig.name);
                    setHelperVm.succeed(`Helper function is set to 1 provison and 0 elasticity.`);
                } catch (e) {
                    setHelperVm.fail(`Fail to set provison and elasticity for helper function.`);
                    throw e;
                }
            } catch(e) {
                await fcDeployComponentIns.remove(fcDeployComponentInputs);
                const errProcessRes = await processMakeHelperFunctionErr(e, times, this.assumeYes);
                if(errProcessRes === 'deleteOssTrigger') {
                    try {
                        await this.deleteOssTrigger();
                    } catch (e) {
                        logger.debug(e);
                        throw new Error(`Attempt to delete oss trigger failed. Please delete it manually: https://fc.console.aliyun.com/fc/overview. You can also use s fc-api component: https://github.com/devsapp/fc-api.`)
                    }
                    retry(e)
                }
            }
        }, 1);
    }

    async deleteOssTrigger(): Promise<void> {
        const fcApi = await core.loadComponent('devsapp/fc-api');
        logger.info(`Delete remote OSS trigger...`);
        const fcApiComponent: FcApiComponent = new FcApiComponent(this.region, this.access, this.appName, this.path, this.userServiceConfig, this.userFunctionConfig);
        const listServicesInputs: InputProps = fcApiComponent.genComponentInputs('fc-api', 'fc-api-project', '', 'listServices', this.credentials);
        const servicesList = YAML.load(await fcApi.listServices(listServicesInputs));
        
        let functionsList = await Promise.all(
            servicesList.map(async service => {
                const listFunctionsInputs: InputProps = fcApiComponent.genComponentInputs('fc-api', 'fc-api-project', `--serviceName ${service.serviceName}`, 'listFunctions', this.credentials);
                let functions = YAML.load(await fcApi.listFunctions(listFunctionsInputs));
                functions = functions.map(func => {
                    return {serviceName: service.serviceName, functionName: func.functionName};
                })
                return functions;
            })
        )
        functionsList = _.flatten(functionsList);

        const triggersList = await Promise.all(
            functionsList.map(async (func: any) => {
                const listTriggersInputs: InputProps = fcApiComponent.genComponentInputs('fc-api', 'fc-api-project', `--functionName ${func.functionName} --serviceName ${func.serviceName}`, 'listTriggers', this.credentials);
                let triggers = YAML.load(await fcApi.listTriggers(listTriggersInputs));
                triggers.forEach(trigger => {
                    Object.assign(trigger, {serviceName: func.serviceName, functionName: func.functionName});
                })
                return triggers;
            })
        )
        const ossTriggers = _.flatten(triggersList).filter((trigger: any)=> trigger.triggerType === 'oss');
                
        let needDeleteOssTriggers = ossTriggers.filter(ossTrigger=>{
            return _.find(this.userTriggerConfigList, userTrigger => { 
                return userTrigger.type === 'oss' && 
                    userTrigger.sourceArn === ossTrigger.sourceArn && 
                    userTrigger.config.filter.key.prefix === ossTrigger.triggerConfig.filter.key.prefix;
            });
        })
        if(_.isEmpty(needDeleteOssTriggers)){
            throw new Error(`Remove oss triggers fail: Unable to locate conflicting trigger. Please remove oss triggers manually: https://fc.console.aliyun.com/fc/overview.`);
        }
        
        needDeleteOssTriggers = needDeleteOssTriggers.map(function(trigger) {
            trigger.region = trigger.sourceArn.split(':')[2];
            return trigger;
        })

        logger.info(`The following triggers will be deleted:\n${YAML.dump(
            needDeleteOssTriggers.map(trigger => {
                return {
                    region: trigger.region,
                    serviceName: trigger.serviceName,
                    functionName: trigger.functionName,
                    triggerName: trigger.triggerName,
                }
            })
        )}`);

        if(this.assumeYes || await isDeleteOssTriggerAndContinue()){
            const deleteOssTriggerTasks = needDeleteOssTriggers.map(async (trigger: any)=>{
                const deleteTriggerInputs: InputProps = fcApiComponent.genComponentInputs('fc-api', 'fc-api-project',
                `--region ${trigger.region} --serviceName ${trigger.serviceName} --functionName ${trigger.functionName} --triggerName ${trigger.triggerName}`,
                'deleteTrigger', this.credentials);
                return fcApi.deleteTrigger(deleteTriggerInputs);
            })

            try {
                const deleteRes = await Promise.all(deleteOssTriggerTasks);
                logger.debug(deleteRes);
                logger.info('Trigger ossTrigger delete success');
            }catch(e){ 
                throw e;
            }
        }else{
            throw new Error('The operation has been cancelled by the user.');        
        }
    }

    async saveHelperFunctionDeployRes(deployRes: any): Promise<any> {
        await setKVInState('helperConfig', deployRes, this.genStateId());
    }

    async saveSession(): Promise<any> {
        await setKVInState('session', this.session, this.genStateId());
    }

    genStateId(): string {
        return `${this.credentials.AccountID}-${this.region}-${this.userServiceConfig?.name}-${this.userFunctionConfig?.name}`;
    }

    async setHelperFunctionProvision(helperServiceName: string, helperFunctionName: string, targetProvision: number, targetAlias?: string): Promise<void> {
        const alias: string = targetAlias || 'LATEST';
        // Set provision to 1
        if (!this.fcClient) {
            const alicloudClient: AlicloudClient = new AlicloudClient(this.credentials);
            this.fcClient = await alicloudClient.getFcClient(this.region);
        }
        try {
            await this.fcClient.putProvisionConfig(helperServiceName, helperFunctionName, alias, { target: targetProvision });
        } catch (e) {
            throw new Error(`Put provision config error: ${e}, please make sure that your account has updateService permission.`);
        }
        let provisionRes: any = await this.fcClient.getProvisionConfig(helperServiceName, helperFunctionName, alias);
        let retryCnt: number = 0;
        while (provisionRes?.data?.current !== 1 && retryCnt <= TunnelService.maxRetryCnt) {
            provisionRes = await this.fcClient.getProvisionConfig(helperServiceName, helperFunctionName, alias);
            retryCnt = retryCnt + 1;
            logger.debug(`Retry setting provision ${retryCnt} times.`);
            await sleep(3000);
        }
        if (provisionRes?.data?.current !== 1) {
            logger.debug(JSON.stringify(provisionRes, null, '  '));
            // TODO: 指定具体权限
            throw new Error(`Set/get provision of helper function error.Please make sure you have the related ram permission.`);
        }
        logger.debug(`Set provision result: ${JSON.stringify(provisionRes?.data)}`);
    }

    private async unsetHelperFunctionConfig(serviceName: string, functionName: string, alias?: string): Promise<void> {
        // 预留设置为 0
        await this.setHelperFunctionProvision(serviceName, functionName, 0, alias);
        // 删除弹性实例配置
        const method: string = 'DELETE';
        const path: string = `/services/${serviceName}.${alias}/functions/${functionName}/on-demand-config`;
        if (!this.client) {
            const alicloudClient: AlicloudClient = new AlicloudClient(this.credentials);
            this.fcClient = await alicloudClient.getFcClient(this.region);
        }
        const elasticityRes: any = await this.fcClient.request(method, path, null, JSON.stringify({}));
        logger.debug(`On-demand config delete result: ${elasticityRes?.statusCode}`);
    }

    private async setHelperFunctionConfig(serviceName: string, functionName: string): Promise<void> {
        const alias: string = 'LATEST';
        // Set provision to 1
        await this.setHelperFunctionProvision(serviceName, functionName, 1, alias);
        // Set elasticity to 0
        const method: string = 'PUT';
        const path: string = `/services/${serviceName}.${alias}/functions/${functionName}/on-demand-config`;
        if (!this.fcClient) {
            const alicloudClient: AlicloudClient = new AlicloudClient(this.credentials);
            this.fcClient = await alicloudClient.getFcClient(this.region);
        }
        const elasticityRes: any = await this.fcClient.request(method, path, null, JSON.stringify({"maximumInstanceCount": 0}));
        logger.debug(`On-demand config put result: ${elasticityRes?.statusCode}`);
    }
    private genOutputFileOfProxyContainer(): any {
        if (!_.isEmpty(this.session)) {
            const outputDirOfContainer: string = path.join(TunnelService.cacheDirPath, this.session?.sessionId);
            // await fse.ensureDir(outputDirOfContainer);
            const stdoutFilePath: string = path.join(outputDirOfContainer, 'stdout.log');
            const stderrFilePath: string = path.join(outputDirOfContainer, 'stderr.log');
            return {
                stdoutFilePath,
                stderrFilePath
            }
        }
        return {};
    }
    private async runProxyContainer(vm?): Promise<any> {
        const imageUrl = `${TunnelService.proxyImaggeRegistry}/${TunnelService.proxyImageRepo}/${TunnelService.proxyImageName}:${TunnelService.proxyImageVersion}`;
        // pull image if need
        vm?.stop();
        await pullImageIfNeed(imageUrl);
        vm?.start();
        // run container in background
        const opts: any = this.generateProxyContainerOpts();
        const { stdoutFilePath, stderrFilePath } = this.genOutputFileOfProxyContainer();
        await fse.ensureDir(path.dirname(stdoutFilePath));
        logger.debug(`Container: ${opts?.name} stdout to: ${stdoutFilePath}, stderr to: ${stderrFilePath}`);
        this.stdoutFileWriteStream = fse.createWriteStream(stdoutFilePath, {flag: 'w+', encoding: 'utf-8', autoClose: true});
        this.stderrFileWriteStream = fse.createWriteStream(stderrFilePath, {flag: 'w+', encoding: 'utf-8', autoClose: true});
        const proxyContainer: any = await runContainer(opts, this.stdoutFileWriteStream, this.stderrFileWriteStream);
        this.streamOfRunner = proxyContainer?.stream;
        this.runner = proxyContainer?.container;
        await this.saveProxyContainerId(this.runner?.id);
    }

    private async saveProxyContainerId(containerId: string): Promise<any> {
        await setKVInState('proxyContainerId', containerId, this.genStateId());
    }

    private async unsetProxyContainerId(): Promise<any> {
        await unsetKVInState('proxyContainerId', this.genStateId());
    }
    private generateProxyContainerDebugOpts(): any {
        const runtime: string = this.userFunctionConfig?.runtime;
        if (isCustomContainerRuntime(runtime)) { return {}; }
        const exposedPort = `${this.debugPort}/tcp`;

        if (this.debugIde === IDE_PYCHARM) {
            if (runtime !== 'python2.7' && runtime !== 'python3' && runtime !== 'python3.9') {
                throw new Error(`${IDE_PYCHARM} debug config only support for runtime [python2.7, python3, python3.9]`);
            } else {
                return {};
            }
        } else if (runtime === 'php7.2') {
            return {};
        } else {
            return {
                ExposedPorts: {
                    [exposedPort]: {}
                },
                HostConfig: {
                    PortBindings: {
                        [exposedPort]: [
                            {
                                'HostIp': '',
                                'HostPort': `${this.debugPort}`
                            }
                        ]
                    }
                }
            };
        }
    }
    private generateProxyContainerOpts(): any {
        const imageName: string = `${TunnelService.proxyImaggeRegistry}/${TunnelService.proxyImageRepo}/${TunnelService.proxyImageName}:${TunnelService.proxyImageVersion}`;
        const containerName: string = genProxyContainerName(this.session?.sessionId);
        const ioOpts = {
            OpenStdin: false,
            Tty: false,
            StdinOnce: true,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true
        };
        const hostOpts = {
            HostConfig: {
                AutoRemove: true,
                Privileged: true,
                Mounts: []
            }
        };
        let debugOpts: any = {};
        if (this.debugPort) {
            debugOpts = this.generateProxyContainerDebugOpts();
        }
        const opts: any = nestedObjectAssign(
        {
            Env: this.generateProxyContainerEnv(),
            Image: imageName,
            name: containerName,
            User: '0:0'
        },
        ioOpts,
        hostOpts,
        debugOpts);
        const encryptedOpts: any = _.cloneDeep(opts);
        if (encryptedOpts?.Env) {
            const encryptedEnv: any = encryptedOpts.Env.map((e: string) => {
                if (e.startsWith("TUNNEL_SERVICE_AK_ID") || e.startsWith("TUNNEL_SERVICE_AK_SECRET") ) {
                    const keyValueList: string[] = e.split('=');
                    const encrptedVal: string = mark(keyValueList[1]);
                    return `${keyValueList[0]}=${encrptedVal}`;
                } else {
                    return e;
                }
            });
            encryptedOpts.Env = encryptedEnv;
        }
        logger.debug(`Tunnel service proxy container options: ${JSON.stringify(encryptedOpts, null, '  ')}`);

        return opts;
    }

    private generateProxyContainerEnv(): any {
        const envs: any = {
            TUNNEL_SERVICE_HOST: TunnelService.tunnerServiceHost,
            TUNNEL_SERVICE_SESSION_ID: this.session?.sessionId,
            TUNNEL_SERVICE_INSTANCE_ID: this.session?.localInstanceId,
            TUNNEL_SERVICE_AK_ID: this.credentials?.AccessKeyID,
            TUNNEL_SERVICE_AK_SECRET: this.credentials?.AccessKeySecret,
        };
        if (isCustomContainerRuntime(this.userFunctionConfig?.runtime) || isCustomRuntime(this.userFunctionConfig?.runtime)) {
            Object.assign(envs, {
                FC_CA_PORT: this.userFunctionConfig?.caPort || 9000
            });
        }
        return _.map(envs || {}, (v, k) => `${k}=${v}`);
    }

    private async queryUntilSessionEstablished(): Promise<void> {
        let res: GetSessionResponse = await this.client.getSession(this.session?.sessionId);
        let state: string = res?.body?.data?.status;
        let retryCnt: number = 0;
        while(state !== 'ESTABLISHED' && retryCnt < TunnelService.maxRetryCnt) {
            await sleep(3000);
            res = await this.client.getSession(this.session?.sessionId);
            state = res?.body?.data?.status;
            retryCnt = retryCnt + 1;
        }
        if (state !== 'ESTABLISHED') {
            throw new Error(`Session establish fail, body in response is: ${JSON.stringify(res?.body, null, '  ')}`);
        }
    }

    public async invokeHelperFunction(args?: string): Promise<any> {
        if (!await this.checkIfProxyContainerRunning()) {
            await this.clean();
            await this.cleanFunctionContainer();
            throw new Error('Proxy container is not running, please run \'clean\' method and retry \'setup\' method.');
        }
        const helperConfig: any = await getHelperConfigFromState(this.credentials?.AccountID, this.region, this.userServiceConfig?.name, this.userFunctionConfig?.name);

        const helperServiceConfig: ServiceConfig = helperConfig?.service;
        const helperFunctionConfig: FunctionConfig = helperConfig?.function;
        // const helperTriggerConfigList: TriggerConfig[] = helperConfig?.triggers;
        logger.info(`Invoking helper service: ${helperServiceConfig?.name}, function: ${helperFunctionConfig?.name} in region: ${this.region} to make local function run.`);
        const fcRemoteInvokeComponent: FcRemoteInvokeComponent = new FcRemoteInvokeComponent(this.region, helperServiceConfig?.name, this.access, this.appName, this.path, helperFunctionConfig?.name);
        // let invokeArgs: string = '--invocation-type sync';
        // if (!_.isEmpty(helperTriggerConfigList) && _.isEmpty(getHttpTrigger(helperTriggerConfigList))) {
        //     invokeArgs = '--invocation-type async';
        // }
        // if (!_.isEmpty(args)) {
        //     invokeArgs = invokeArgs + ' ' + args;
        // }

        const inputs: InputProps = fcRemoteInvokeComponent.genComponentInputs('fc-remote-invoke', 'fc-remote-invoke-project', args, 'invoke', this.credentials, helperConfig.customDomains);
        const fcRemoteInvokeComponentIns: any = await core.loadComponent(`devsapp/fc-remote-invoke`);
        await fcRemoteInvokeComponentIns.invoke(inputs);
    }

    public async checkIfProxyContainerRunning(): Promise<boolean> {
        const proxyContainerId: string = await getProxyContainerIdFromState(this.credentials?.AccountID, this.region, this.userServiceConfig?.name, this.userFunctionConfig?.name);
        if (!proxyContainerId) { return false; }
        const runningContainers: any = (await docker.listContainers()).map((container) => container?.Id);
        if (runningContainers.includes(proxyContainerId)) { return true; }
        return false;
    }

    public async clean(): Promise<any> {
        const helperConfig: any = await getHelperConfigFromState(this.credentials?.AccountID, this.region, this.userServiceConfig?.name, this.userFunctionConfig?.name);
        const session: Session = await getSessionFromState(this.credentials?.AccountID, this.region, this.userServiceConfig?.name, this.userFunctionConfig?.name);
        const proxyContainerId: string = await getProxyContainerIdFromState(this.credentials?.AccountID, this.region, this.userServiceConfig?.name, this.userFunctionConfig?.name);
        const helperServiceConfig: ServiceConfig = helperConfig?.service;
        const helperFunctionConfig: FunctionConfig = helperConfig?.function;
        const helperTriggerConfigList: TriggerConfig[] = helperConfig?.triggers;
        // 关闭容器
        if (proxyContainerId) {
            try {
                const c: any = docker.getContainer(proxyContainerId);
                await stopContainer(c);
                await this.unsetProxyContainerId();
            } catch (e) {
                logger.warning(StdoutFormatter.stdoutFormatter.warn('stop proxy container', `containerId: ${proxyContainerId}`, e?.message));
                logger.debug(`Stop proxy container: ${proxyContainerId} error: ${e}`);
            }
        }

        // 预留设为 0，删除弹性实例配置
        const unsetConfigVm: any = core.spinner(`Unsetting helper function config...`);
        try {
            await this.unsetHelperFunctionConfig(helperServiceConfig?.name, helperFunctionConfig?.name, 'LATEST');
            unsetConfigVm.succeed(`Unset helper function provision and on-demand config done.`);
        } catch (e) {
            unsetConfigVm.fail(`Unset error.`);
            logger.error(e?.message);
            logger.debug(`Error: ${e}`);
        }

        // 等待预留实例清空
        if(!this.fcClient) {
            const alicloudClient: AlicloudClient = new AlicloudClient(this.credentials);
            this.fcClient = await alicloudClient.getFcClient(this.region);
        }
        let res = await this.fcClient.getProvisionConfig(helperServiceConfig.name, helperFunctionConfig.name, 'LATEST');
        while(!_.isNil(res.data) && res.data?.current !== 0) {
            await sleep(1000);
            res = await this.fcClient.getProvisionConfig(helperServiceConfig.name, helperFunctionConfig.name, 'LATEST');
        }
        // 删除辅助函数
        try {
            const fcDeployComponent: FcDeployComponent = new FcDeployComponent(this.region, helperServiceConfig, this.access, this.appName, this.path, helperFunctionConfig, helperTriggerConfigList);
            const fcDeployComponentIns: any = await core.loadComponent(`devsapp/fc-deploy`);

            const fcDeployComponentInputs: InputProps = fcDeployComponent.genComponentInputs('fc-deploy', 'fc-deploy-project', 'service -y', 'remove');
            await fcDeployComponentIns.remove(fcDeployComponentInputs);
        } catch (e) {
            logger.warning(StdoutFormatter.stdoutFormatter.warn('remove helper service', `serviceName: ${helperServiceConfig?.name}, functionName: ${helperFunctionConfig?.name}`, e?.message));
            logger.debug(`Error: ${e}`);
        }

        // 关闭 session
        const deleteSessionVm: any = core.spinner(`Deleting session: ${session?.sessionId}...`);;
        try {
            await this.deleteSession(session?.sessionId);
            deleteSessionVm.succeed(`Delete session: ${session?.sessionId} done.`);
        } catch (e) {
            deleteSessionVm.fail(`Delete error.`);
            logger.error(e?.message);
            logger.debug(`Error: ${e}`);
        }
    }

    public getSession(): Session {
        return this.session;
    }
}
