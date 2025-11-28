import type { IResultTuple } from "@/utils/result/tuple";

interface IAsyncWithError {
  <T>(promise: Promise<T>): Promise<IResultTuple<T>>;
}

export type { IAsyncWithError };
