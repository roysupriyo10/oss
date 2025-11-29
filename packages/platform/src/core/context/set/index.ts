import type { IContext, IContextSet } from "@roysupriyo10/types/platform";
import { getAdapter } from "@/core/adapter";
import { CONTEXT_KEY } from "@/core/context/get";

const set: IContextSet = function (ctx: IContext) {
  const adapter = getAdapter();
  adapter.storage.set<IContext>(CONTEXT_KEY, ctx);
};

export default set;
