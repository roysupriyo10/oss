import type fsp from "node:fs/promises";

interface IExists {
  (...parameters: Parameters<typeof fsp.access>): Promise<boolean>;
}

export type { IExists };
