import type { IPwd } from "@roysupriyo10/types/fs";

const pwd: IPwd = function () {
  return process.cwd();
};

export default pwd;
