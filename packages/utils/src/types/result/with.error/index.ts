import type { IResultTuple } from "@/types/result/tuple";
import type { ISyncWithError } from "../sync.with.error";
import type { IAsyncWithError } from "../async.with.error";

interface IWithError extends ISyncWithError, IAsyncWithError {
  <T>(promise: Promise<T>): Promise<IResultTuple<T>>;
  <T>(fn: () => Promise<T>): Promise<IResultTuple<T>>;
  <T>(fn: () => T): IResultTuple<T>;
}

export type { IWithError };
