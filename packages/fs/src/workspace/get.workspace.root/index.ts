import { type IGetWorkspaceRoot } from "@roysupriyo10/types/fs";

import { readdirSync } from "node:fs";
import path from "node:path";

import sh from "@/sh";

const getWorkspaceRoot: IGetWorkspaceRoot = async function () {
  const cwd = sh.pwd();

  // when context package is ready, use environment variable from that
  const workspaceConfigFilename =
    // process.env.PNPM_WORKSPACE_CONFIG ??
    // process.env.pnpm_workspace_config ??
    "pnpm-workspace.yaml";

  const currentDirPath = path.resolve(cwd);

  function findWorkspaceRoot(dir: string) {
    if (dir === "/") {
      console.error("No workspace root found");
      process.exit(1);
    }

    try {
      const files = readdirSync(dir);
      if (!files.includes(workspaceConfigFilename)) {
        return findWorkspaceRoot(path.dirname(dir));
      }

      return dir;
    } catch (filesError) {
      console.error(filesError);
      process.exit(1);
    }
  }

  return findWorkspaceRoot(currentDirPath);
};

export default getWorkspaceRoot;
