import * as path from "path";
import { lodash as _ } from '@serverless-devs/core';
const USER_HOME = require('os').homedir();
const fs = require('fs-extra');

const defaultFileSharingPaths = [
    '/Users',
    '/Volumes',
    '/private',
    '/tmp'
];

export async function findPathsOutofSharedPaths(mounts) {
    const dockerSharedPaths = await getSharedPathsOfDockerForMac();
    let pathsOutofSharedPaths = [];
    for (let mount of mounts) {
        if (_.isEmpty(mount)) { continue; }

        const mountPath = mount.Source;
        let isMountPathSharedToDocker = false;
        for (let dockerSharedPath of dockerSharedPaths) {
            if (mountPath.startsWith(dockerSharedPath)) {
                isMountPathSharedToDocker = true;
                break;
            }
        }
        if (!isMountPathSharedToDocker) {
            pathsOutofSharedPaths.push(mountPath);
        }
    }
    return pathsOutofSharedPaths;
}

async function getSharedPathsOfDockerForMac() {

    const settingsPath = path.join(USER_HOME, 'Library/Group Containers/group.com.docker/settings.json');

    const fileData = await fs.readFile(settingsPath, 'utf8');

    const settings = JSON.parse(fileData);

    if (settings.hasOwnProperty('filesharingDirectories')) {
        return settings.filesharingDirectories;
    }
    return defaultFileSharingPaths;
}

