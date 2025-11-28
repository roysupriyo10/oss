import type { IDirname } from "@roysupriyo10/types/fs";

import path from "node:path";

const dirname: IDirname = function (filePath) {
  return path.dirname(filePath);
};

export default dirname;
