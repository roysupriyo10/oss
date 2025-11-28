import type { IResultTuple } from "@/utils/result/tuple";

interface IIsErr {
  <T>(result: IResultTuple<T>): result is [unknown, undefined];
}

export type { IIsErr };
