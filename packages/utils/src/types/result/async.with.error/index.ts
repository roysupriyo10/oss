import type { IResultTuple } from "@/types/result/tuple";

interface IAsyncWithError {
  <T>(promise: Promise<T>): Promise<IResultTuple<T>>;
}

export type { IAsyncWithError };
