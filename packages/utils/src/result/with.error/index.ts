import type { IWithError } from "@roysupriyo10/types/utils";
import promise from "@/promise";
import asyncWithError from "@/result/async.with.error";

const withError: IWithError = function (input) {
  if (promise.isPromise(input)) {
    return asyncWithError(input);
  }

  if (typeof input === "function") {
    try {
      const result = input();

      if (promise.isPromise(result)) {
        return asyncWithError(result);
      }

      return [null, result] as const;
    } catch (error) {
      return [error, undefined] as const;
    }
  }

  const error = new Error(`Invalid input received for withError`);

  return [error, undefined];
} as IWithError; /** final overload to match both sync and async signature */

export default withError;
