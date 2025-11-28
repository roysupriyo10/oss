import type { IResultTuple } from "@/types/result/tuple";

interface IIsOk {
  <T>(result: IResultTuple<T>): result is [null, T];
}

export type { IIsOk };
