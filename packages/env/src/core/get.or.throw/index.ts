import type { IEnv, IEnvAdapter } from "@roysupriyo10/types/env";
import type { WithAdapter } from "@roysupriyo10/types/utils";
import get from "@/core/get";

const getOrThrow: WithAdapter<IEnv["getOrThrow"], IEnvAdapter> = function (
  adapter,
  key,
) {
  const value = get(adapter, key);

  if (value === undefined) {
    throw new Error(`Environment variable "${key}" is not set.`);
  }

  return value;
};

export default getOrThrow;
