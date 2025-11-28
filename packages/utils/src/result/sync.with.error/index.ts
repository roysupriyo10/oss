import type { IResultTuple, ISyncWithError } from "@roysupriyo10/types/utils";

const syncWithError: ISyncWithError = function (input) {
  try {
    const result = input();

    return [null, result] as IResultTuple<typeof result>;
  } catch (error) {
    return [error, undefined];
  }
};

export default syncWithError;
