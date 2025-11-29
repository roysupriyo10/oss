import type fsp from "node:fs/promises";

type ICpOptions = { source: string | string[]; destination: string };

interface ICp {
  (
    options: ICpOptions,
    extraOptions: Parameters<typeof fsp.cp>[2],
  ): Promise<void>;
}

export type { ICp };
