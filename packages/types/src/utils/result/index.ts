export * from "./tuple/index.js";
export * from "./with.error/index.js";
export * from "./is.ok/index.js";
export * from "./async.with.error/index.js";
export * from "./sync.with.error/index.js";
export * from "./is.err/index.js";
export * from "./is.ok/index.js";

import type { IWithError } from "./with.error/index.js";
import type { IIsErr } from "./is.err/index.js";
import type { IIsOk } from "./is.ok/index.js";
import type { IAsyncWithError } from "./async.with.error/index.js";
import type { ISyncWithError } from "./sync.with.error/index.js";

interface IResult {
  withError: IWithError;
  asyncWithError: IAsyncWithError;
  syncWithError: ISyncWithError;
  isErr: IIsErr;
  isOk: IIsOk;
}

export type { IResult };
