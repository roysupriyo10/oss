import fsp from "node:fs/promises";

type IRealpath = typeof fsp.realpath;

export type { IRealpath };
