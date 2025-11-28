import type { IPromise } from "./promise";
import type { IResult } from "./result";
import type { IUUID } from "./uuid";

interface IUtils {
  uuid: IUUID;
  result: IResult;
  promise: IPromise;
}

export { type IUtils, type IUUID };
