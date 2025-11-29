import type { IPlatform } from "@roysupriyo10/types/platform";

import detect from "./detect";
import init from "./init";
import context from "./context";

const platform: IPlatform = {
  detect,
  init,
  context,
};

export default platform;
