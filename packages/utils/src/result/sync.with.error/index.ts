import type { IResultTuple } from "@/types/result";
import type { ISyncWithError } from "@/types/result/sync.with.error";

const syncWithError: ISyncWithError = function (input) {
  try {
    const result = input();

    return [null, result] as IResultTuple<typeof result>;
  } catch (error) {
    return [error, undefined];
  }
};

export default syncWithError;
