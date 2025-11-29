import type { IPlatformAdapter, IInit } from "@roysupriyo10/types/platform";
import { setAdapter } from "@/core/adapter";

const init: IInit = function (adapter: IPlatformAdapter): void {
  setAdapter(adapter);
};

export default init;
