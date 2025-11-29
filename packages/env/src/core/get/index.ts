import type { IEnv, IEnvAdapter } from "@roysupriyo10/types/env";
import type { WithAdapter } from "@roysupriyo10/types/utils";

const get: WithAdapter<IEnv["get"], IEnvAdapter> = function (adapter, key) {
  return adapter.get(key);
};

export default get;
