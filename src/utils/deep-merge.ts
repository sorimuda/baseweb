/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

export default function deepMerge(
  target?: {} | null,
  ...sources: Array<null | {} | undefined | null>
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
any {
  target = target || {};
  const len = sources.length;
  let obj;
  let value;
  for (let i = 0; i < len; i++) {
    obj = sources[i] || {};
    for (let key in obj) {
      if (typeof obj[key] !== undefined) {
        value = obj[key];
        if (isCloneable(value)) {
          target[key] = deepMerge(
            /* eslint-disable-next-line no-mixed-operators */
            target[key] || (Array.isArray(value) && []) || {},
            value
          );
        } else {
          target[key] = value;
        }
      }
    }
  }
  return target;
}

function isCloneable(obj: unknown) {
  /* eslint-disable-next-line eqeqeq */
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}
