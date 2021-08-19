import * as path from 'path';
import { detectTmpDir } from '../devs';
import * as fs from 'fs-extra';

export async function ensureTmpDir(tmpDir: string, devsPath: string, serviceName: string, functionName: string) {

  const absTmpDir = tmpDir ? path.resolve(tmpDir) : path.resolve(detectTmpDir(devsPath), serviceName, functionName);

  if (await fs.pathExists(absTmpDir)) {

    const stats = await fs.lstat(absTmpDir);

    if (stats.isFile()) {
      throw new Error(`'${absTmpDir}' should be a directory.`);
    }
  } else {
    await fs.ensureDir(absTmpDir, {
      mode: parseInt('0777', 8)
    });
  }

  return absTmpDir;
}

export function isNccPath(targetPath: string): boolean {
  return path.basename(targetPath) === 'lib';
}
