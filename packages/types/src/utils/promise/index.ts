export * from "./is.promise";

import type { IIsPromise } from "./is.promise";

interface IPromise {
  isPromise: IIsPromise;
}

export type { IPromise };
