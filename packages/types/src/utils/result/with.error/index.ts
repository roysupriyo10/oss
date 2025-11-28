import type { IResultTuple } from "@/utils/result/tuple";
import type { ISyncWithError } from "@/utils/result/sync.with.error";
import type { IAsyncWithError } from "@/utils/result/async.with.error";

interface IWithError extends ISyncWithError, IAsyncWithError {
  <T>(promise: Promise<T>): Promise<IResultTuple<T>>;
  <T>(fn: () => Promise<T>): Promise<IResultTuple<T>>;
  <T>(fn: () => T): IResultTuple<T>;
}

export type { IWithError };
