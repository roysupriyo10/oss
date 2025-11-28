import type { IResultTuple } from "./tuple";
import type { IWithError } from "./with.error";
import type { IIsErr } from "./is.err";
import type { IIsOk } from "./is.ok";
import type { IAsyncWithError } from "./async.with.error";
import type { ISyncWithError } from "./sync.with.error";

interface IResult {
  withError: IWithError;
  asyncWithError: IAsyncWithError;
  syncWithError: ISyncWithError;
  isErr: IIsErr;
  isOk: IIsOk;
}

export type {
  ISyncWithError,
  IAsyncWithError,
  IResult,
  IResultTuple,
  IWithError,
  IIsErr,
  IIsOk,
};
