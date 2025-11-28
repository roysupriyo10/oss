export * from "./sh/index.js";
export * from "./exists/index.js";
export * from "./package/index.js";
export * from "./workspace/index.js";

import type { IExists } from "./exists/index.js";
import type { IPackage } from "./package/index.js";
import type { ISh } from "./sh/index.js";
import type { IWorkspace } from "./workspace/index.js";

interface IFs {
  exists: IExists;
  sh: ISh;
  package: IPackage;
  workspace: IWorkspace;
}

export type { IFs };
