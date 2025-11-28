import type { IIsPromise } from "@roysupriyo10/types/utils";

const isPromise: IIsPromise = function <T>(
  value: unknown,
): value is Promise<T> {
  return (
    value !== null &&
    value instanceof Promise &&
    typeof value === "object" &&
    typeof value.then === "function" &&
    typeof value.catch === "function"
  );
};

export default isPromise;
