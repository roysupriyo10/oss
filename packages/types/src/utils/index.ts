export * from "./promise/index.js";
export * from "./result/index.js";
export * from "./uuid/index.js";
export * from "./with.adapter/index.js";

import type { IPromise } from "./promise/index.js";
import type { IResult } from "./result/index.js";
import type { IUUID } from "./uuid/index.js";

interface IUtils {
  uuid: IUUID;
  result: IResult;
  promise: IPromise;
}

export type { IUtils };
