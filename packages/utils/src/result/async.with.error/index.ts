import type { IResultTuple } from "@/types/result";
import type { IAsyncWithError } from "@/types/result/async.with.error";

const asyncWithError: IAsyncWithError = function (input) {
  return input
    .then(function (data) {
      return [null, data] as IResultTuple<typeof data>;
    })
    .catch(function (error: unknown) {
      return [error, undefined];
    });
};

export default asyncWithError;
