import type { IPlatformContext } from "@roysupriyo10/types/platform";

import get from "./get";
import set from "./set";

const context: IPlatformContext = { get, set };

export default context;
