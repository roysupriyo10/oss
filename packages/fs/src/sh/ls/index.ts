import type { ILs } from "@roysupriyo10/types/fs";

import fsp from "node:fs/promises";

const ls: ILs = fsp.readdir;

export default ls;
