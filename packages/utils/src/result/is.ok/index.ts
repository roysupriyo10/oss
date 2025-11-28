import type { IIsOk } from "@roysupriyo10/types/utils";

const isOk = function (result) {
  return result[0] === null;
} as IIsOk;

export default isOk;
