import { type IGetWorkspaceRoot } from "@roysupriyo10/types/fs";
import platform from "@roysupriyo10/platform";
import utils from "@roysupriyo10/utils";

import sh from "@/sh";

const getWorkspaceRoot: IGetWorkspaceRoot = async function () {
  const cwd = sh.pwd();

  const ctx = platform.context.get({ optional: true });

  const workspaceConfigFilename =
    ctx?.env.get("PNPM_WORKSPACE_CONFIG") ??
    ctx?.env.get("pnpm_workspace_config") ??
    "pnpm-workspace.yaml";

  const currentDirPath = await sh.realpath(cwd);

  const findWorkspaceRoot = async function (dir: string): Promise<string> {
    if (dir === "/") {
      throw new Error("No workspace root found");
    }

    const listDirectoryResult = await utils.result.withError(sh.ls(dir));

    if (utils.result.isErr(listDirectoryResult)) {
      const [error] = listDirectoryResult

      throw error;
    }

    const [, files] = listDirectoryResult;

    if (!files.includes(workspaceConfigFilename)) {
      return findWorkspaceRoot(sh.dirname(dir));
    }

    return dir;
  };

  return findWorkspaceRoot(currentDirPath);
};

export default getWorkspaceRoot;
