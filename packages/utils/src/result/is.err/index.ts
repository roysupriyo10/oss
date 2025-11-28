import type { IIsErr } from "@/types/result";

const isErr = function (result) {
  return result[0] !== null;
} as IIsErr;

export default isErr;
