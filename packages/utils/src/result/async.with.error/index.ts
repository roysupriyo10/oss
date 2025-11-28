import type { IResultTuple, IAsyncWithError } from "@roysupriyo10/types/utils";

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
