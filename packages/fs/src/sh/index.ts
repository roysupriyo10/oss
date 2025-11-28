import type { ISh } from "@roysupriyo10/types/fs";

import basename from "./basename";
import cp from "./cp";
import dirname from "./dirname";
import ls from "./ls";
import mkdir from "./mkdir";
import mv from "./mv";
import pwd from "./pwd";
import realpath from "./realpath";
import rm from "./rm";
import touch from "./touch";

const sh: ISh = {
  basename,
  cp,
  dirname,
  ls,
  mkdir,
  mv,
  pwd,
  realpath,
  rm,
  touch,
};

export default sh;
