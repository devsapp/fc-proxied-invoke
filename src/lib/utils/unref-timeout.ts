'use strict';

export function unrefTimeout(fn: any, timeout?: number) {
  if (!timeout) { timeout = 1500; }

  const t = setTimeout(fn, timeout);

  t.unref();
}
