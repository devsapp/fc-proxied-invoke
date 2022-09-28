import path from 'path';
import { loadComponent, lodash as _, fse } from '@serverless-devs/core';
import logger from '../../common/logger';
import { FunctionConfig } from '../interface/fc-function';
import * as fs from 'fs-extra';

/**
 * 默认的bootstrap，环境变量3者生效顺序：环境变量>自定义参数>默认bootstrap
 * @param functionConfig FunctionConfig
 * @returns 
 */
export default async function(functionConfig: FunctionConfig) {
  // 存在环境变量则退出，不检测
  if (!_.isEmpty(functionConfig.environmentVariables?.AGENT_SCRIPT)) {
    return;
  }

  const codeUri = functionConfig?.codeUri || '';
  if (!_.isEmpty(functionConfig.customRuntimeConfig?.command)) {
    // 确保是文件夹
    const codeUriStat = await fs.stat(codeUri);
    if (!codeUriStat.isDirectory()) {
      logger.warn(`${codeUri} is not a directory and cannot simulate startup`);
      return;
    }
    // 组装文件内容
    const { command, args } = functionConfig.customRuntimeConfig;
    let fileStr = `#!/bin/bash\n${command.join(' ')}`;
    if (!_.isEmpty(args)) {
      fileStr += ` ${args.join(' ')}`
    }
    // 写入文件
    const filePath = path.join(codeUri, '.s', '.fc_local_gen_bootstrap');
    await fs.remove(filePath); // 多次执行报错没有权限
    await fse.outputFile(filePath, fileStr, { mode: 0x755 })
    // 写入环境变量
    functionConfig.environmentVariables = Object.assign(
      functionConfig.environmentVariables || {}, { AGENT_SCRIPT: '.s/.fc_local_gen_bootstrap' }
    );
    return;
  }
  const bootstrapFile = path.join(codeUri, 'bootstrap');
  try {
    const { getFileEndOfLineSequence } = await loadComponent('devsapp/fc-core');
    const fileEndOfLineSequence = await getFileEndOfLineSequence(bootstrapFile);
    if (typeof fileEndOfLineSequence === 'string' && fileEndOfLineSequence !== 'LF') {
      logger.warn(`The bootstrap line ending sequence was detected as ${fileEndOfLineSequence}, possibly affecting the function call. The supported format is LF.`);
    }
  } catch (_ex) { /* 不阻塞主程序运行 */ }
}

