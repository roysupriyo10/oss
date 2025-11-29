import type { IContext, IContextGet } from "@roysupriyo10/types/platform";
import { getAdapter } from "@/core/adapter";

const CONTEXT_KEY = Symbol.for("@roysupriyo10/context");

const get = function (options?: { optional?: boolean }) {
  const adapter = getAdapter();
  const ctx = adapter.storage.get<IContext>(CONTEXT_KEY);

  if (ctx === undefined) {
    if (options?.optional === true) {
      return null;
    }

    throw new Error(
      "Context not set. Call platform.context.set({ env }) first.",
    );
  }

  return ctx;
} as IContextGet;

export default get;
export { CONTEXT_KEY };
