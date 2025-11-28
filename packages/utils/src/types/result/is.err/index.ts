import type { IResultTuple } from "@/types/result/tuple";

interface IIsErr {
  <T>(result: IResultTuple<T>): result is [unknown, undefined];
}

export type { IIsErr };
