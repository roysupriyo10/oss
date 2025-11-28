import fsp from "node:fs/promises";

import type { IExists } from "@roysupriyo10/types/fs";
import utils from "@roysupriyo10/utils";

const exists: IExists = async function (file) {
  const fileAccessResult = await utils.result.withError(fsp.access(file));

  if (utils.result.isErr(fileAccessResult)) {
    return false;
  }

  return true;
};

export default exists;
