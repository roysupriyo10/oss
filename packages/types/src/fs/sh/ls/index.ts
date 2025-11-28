import type fsp from "node:fs/promises";

type ILs = typeof fsp.readdir;

export type { ILs };
