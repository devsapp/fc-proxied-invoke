import readline from "readline";
import * as fs from 'fs-extra';

export function readLines(fileName): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const lines: string[] = [];

        readline.createInterface({input: fs.createReadStream(fileName)})
            .on('line', line => lines.push(line))
            .on('close', () => resolve(lines))
            .on('error', reject);
    });
}
