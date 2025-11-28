import type { IResult } from "@/types/result";

import withError from "./with.error";
import asyncWithError from "./async.with.error";
import syncWithError from "./sync.with.error";
import isOk from "./is.ok";
import isErr from "./is.err";

const result: IResult = {
  withError,
  asyncWithError,
  isErr,
  isOk,
  syncWithError,
};

export default result;
