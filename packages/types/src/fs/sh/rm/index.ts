import type fsp from "node:fs/promises";

type IRmOptions = { path: string | string[] };

type IRm = (
  options: IRmOptions,
  extraOptions?: Parameters<typeof fsp.rm>[1],
) => Promise<void>;

export type { IRm };
