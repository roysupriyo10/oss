import fsp from "node:fs/promises";

type IMkdirOptions = {
  path: string | string[];
};

type IMkdir = (
  options: IMkdirOptions,
  extraOptions?: Parameters<typeof fsp.mkdir>[1],
) => Promise<void>;

export type { IMkdir };
