import inquirer from 'inquirer';

export async function isContinueWhenNasMountError() {
  const promptList = [
    {
      type: 'list',
      message: 'Do you want to mount nas in local mode and continue?',
      name: 'isContinue',
      choices: ['Yes', 'No'],
      filter: function (val) {
        return val === 'Yes';
      },
    },
  ];
  const isContinue: Boolean = (await inquirer.prompt(promptList)).isContinue;
  return isContinue;
}
