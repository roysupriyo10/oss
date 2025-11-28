import type { IIsOk } from "@/types/result";

const isOk = function (result) {
  return result[0] === null;
} as IIsOk;

export default isOk;
