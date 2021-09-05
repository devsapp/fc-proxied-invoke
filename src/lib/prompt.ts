import inquirer from 'inquirer';

export async function isContinueWhenNasMountError() {
  return await getYesOrNo('Do you want to mount nas in local mode and continue?');
}

export async function isDeleteOssTriggerAndContinue() {
  return await getYesOrNo('Do you want to remove the remote oss trigger and continue?');
}

export async function getYesOrNo(message: string): Promise<boolean> {
  const promptList = [
    {
      type: 'list',
      message,
      name: 'isContinue',
      choices: ['Yes', 'No'],
      filter: function (val: any) {
        return val === 'Yes';
      },
    },
  ];
  const isContinue: boolean = (await inquirer.prompt(promptList)).isContinue;
  return isContinue;
}
