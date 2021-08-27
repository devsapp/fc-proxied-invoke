import path from 'path';
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
      // 每3个小时定时执行一次
      cronExpression: '0 0 0,3,6,9,12,15,18,21 * * * ',
      enable: true,
      payload: '',
    },
  },
  zipFile: path.join(__dirname, 'cleaner.zip'),
};
