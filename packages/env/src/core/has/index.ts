import type { IEnv, IEnvAdapter } from "@roysupriyo10/types/env";
import type { WithAdapter } from "@roysupriyo10/types/utils";
import get from "@/core/get";

const has: WithAdapter<IEnv["has"], IEnvAdapter> = function (adapter, key) {
  return get(adapter, key) !== undefined;
};

export default has;
