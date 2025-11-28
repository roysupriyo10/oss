import type { IGetWorkspaceRoot } from "./get.workspace.root/index.js";

interface IWorkspace {
  getWorkspaceRoot: IGetWorkspaceRoot;
}

export type { IWorkspace };
