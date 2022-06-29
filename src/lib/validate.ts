import {ICredentials} from "../common/entity";
import { lodash as _ } from '@serverless-devs/core';
import logger from '../common/logger';
import StdoutFormatter from './component/stdout-formatter';

export function validateCredentials(creds: ICredentials): void {
    if (_.isEmpty(creds?.AccountID)) {
        logger.warn(StdoutFormatter.stdoutFormatter.warn(`credentials validation failed`, `empty AccountID, please using 's config add' to add it.`));
    }
    if (_.isEmpty(creds?.AccessKeyID)) {
        logger.warn(StdoutFormatter.stdoutFormatter.warn(`credentials validation failed`, `empty AccessKeyID, please using 's config add' to add it.`));
    }
    if (_.isEmpty(creds?.AccessKeySecret)) {
        logger.warn(StdoutFormatter.stdoutFormatter.warn(`credentials validation failed`, `empty AccessKeySecret, please using 's config add' to add it.`));
    }
}
