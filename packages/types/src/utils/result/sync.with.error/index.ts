import type { IResultTuple } from "@/utils/result/tuple";

interface ISyncWithError {
  <T>(fn: () => T): IResultTuple<T>;
}

export type { ISyncWithError };
