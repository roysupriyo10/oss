import type { IIsErr } from "@roysupriyo10/types/utils";

const isErr = function (result) {
  return result[0] !== null;
} as IIsErr;

export default isErr;
