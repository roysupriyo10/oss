import type { IPlatformAdapter } from "../adapter";

interface IInit {
  (adapter: IPlatformAdapter): void;
}

export type { IInit };
