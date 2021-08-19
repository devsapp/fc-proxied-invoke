'use strict';

import retry from 'promise-retry';

const defaultRetries = 2;

export async function promiseRetry(fn: any, retries?: number): Promise<any> {
  const retryOptions = {
    retries: retries || defaultRetries,
    factor: 2,
    minTimeout: 1 * 1000,
    randomize: true,
  };
  return retry(fn, retryOptions);
}
