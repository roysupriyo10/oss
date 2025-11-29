import type { IResultTuple } from "@/utils/result/tuple";

interface IWithError {
  <T>(promise: Promise<T>): Promise<IResultTuple<T>>;
  <T>(fn: () => Promise<T>): Promise<IResultTuple<T>>;
  <T>(fn: () => T): IResultTuple<T>;
}

export type { IWithError };
