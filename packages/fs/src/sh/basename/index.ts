import type { IBasename } from "@roysupriyo10/types/fs";

import path from "node:path";

const basename: IBasename = function (filePath, suffix) {
  return path.basename(filePath, suffix);
};

export default basename;
