interface IIsPromise {
  <T>(value: unknown): value is Promise<T>;
}

export type { IIsPromise };
