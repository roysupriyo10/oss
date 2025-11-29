import type { IEnv, IEnvAdapter } from "@roysupriyo10/types/env";

import get from "./get";
import getOrThrow from "./get.or.throw";
import has from "./has";

const createEnv = function (adapter: IEnvAdapter): IEnv {
  return {
    get: (key) => get(adapter, key),
    getOrThrow: (key) => getOrThrow(adapter, key),
    has: (key) => has(adapter, key),
  };
};

export default createEnv;
