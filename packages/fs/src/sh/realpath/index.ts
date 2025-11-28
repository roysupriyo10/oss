import type { IRealpath } from "@roysupriyo10/types/fs";
import fsp from "node:fs/promises";

const realpath: IRealpath = fsp.realpath;

export default realpath;
