import * as fs from 'fs-extra';
import parser from 'git-ignore-parser';
import ignore from 'ignore';
import * as path from 'path';

const ignoredFile: string[] = ['.git', '.svn', '.env', '.DS_Store', 'template.packaged.yml', '.nas.yml', '.s/nas', '.s/tmp', '.s/package', '.s/*.json', 's.yml', 's.yaml', '.vscode', '.idea'];

export async function isIgnored(baseDir: string, runtime?: string): Promise<any> {

  const ignoreFilePath = `${baseDir}/.fcignore`;

  const fileContent = await getIgnoreContent(ignoreFilePath);

  const ignoreDependencies = selectIgnored(runtime);


  const ignoredPaths = parser(`${[...ignoredFile, ...ignoreDependencies].join('\n')}\n${fileContent}`);

  const ig = ignore().add(ignoredPaths);
  return function (f) {
    const relativePath = path.relative(baseDir, f);
    if (relativePath === '') { return false; }
    return ig.ignores(relativePath);
  };
};

async function getIgnoreContent(ignoreFilePath) {
  let fileContent = '';

  if (fs.existsSync(ignoreFilePath)) {
    fileContent = await fs.readFile(ignoreFilePath, 'utf8');
  }
  return fileContent;
}

function selectIgnored(runtime) {
  switch (runtime) {
  case 'nodejs6':
  case 'nodejs8':
  case 'nodejs10':
  case 'nodejs12':

    return ['.s/python'];
  case 'python2.7':
  case 'python3':

    return ['node_modules'];
  case 'php7.2':

    return ['node_modules', '.s/python'];
  default:
    return [];
  }
}
