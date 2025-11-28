export * from "./dirname/index.js";
export * from "./ls/index.js";
export * from "./realpath/index.js";
export * from "./touch/index.js";
export * from "./rm/index.js";
export * from "./mkdir/index.js";
export * from "./mv/index.js";
export * from "./pwd/index.js";
export * from "./cp/index.js";

import type { IBasename } from "./basename/index.js";
import type { ICp } from "./cp/index.js";
import type { IDirname } from "./dirname/index.js";
import type { ILs } from "./ls/index.js";
import type { IMkdir } from "./mkdir/index.js";
import type { IMv } from "./mv/index.js";
import type { IPwd } from "./pwd/index.js";
import type { IRealpath } from "./realpath/index.js";
import type { IRm } from "./rm/index.js";
import type { ITouch } from "./touch/index.js";

interface ISh {
  basename: IBasename;
  cp: ICp;
  dirname: IDirname;
  ls: ILs;
  mkdir: IMkdir;
  mv: IMv;
  pwd: IPwd;
  realpath: IRealpath;
  rm: IRm;
  touch: ITouch;
}

export type { ISh };
