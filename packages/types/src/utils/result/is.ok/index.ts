import type { IResultTuple } from "@/utils/result/tuple";

interface IIsOk {
  <T>(result: IResultTuple<T>): result is [null, T];
}

export type { IIsOk };
