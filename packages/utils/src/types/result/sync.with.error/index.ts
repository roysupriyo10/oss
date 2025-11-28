import type { IResultTuple } from "@/types/result/tuple";

interface ISyncWithError {
  <T>(fn: () => T): IResultTuple<T>;
}

export type { ISyncWithError };
