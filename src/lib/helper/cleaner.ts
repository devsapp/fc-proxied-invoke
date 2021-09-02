import path from 'path';
import { isNccPath } from '../utils/path';
export const CLEANERCONFIG = {
  serviceConfig: {
    name: '_FC_Session_Service_Cleaner',
  },
  functionConfig: {
    name: 'cleaner',
    description: 'The function for cleaning the closed sessions periodically.',
    runtime: 'nodejs12',
    handler: 'index.handler',
    memorySize: 128,
    timeout: 60,
  },
  triggerConfig: {
    triggerName: 'timerTrigger',
    triggerType: 'timer',
    triggerConfig: {
      // 每隔 5 分钟定时执行一次
      cronExpression: '@every 5m',
      enable: true,
      payload: '',
    },
  },
  zipFile: isNccPath(__dirname) ? path.join(__dirname, 'lib', 'helper', 'cleaner.zip') : path.join(__dirname, 'cleaner.zip'),
  version: '0.0.1',
};
