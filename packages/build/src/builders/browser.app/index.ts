import { build as viteBuild } from "vite";
import path from "node:path";
import { rm } from "node:fs/promises";
import { type BrowserAppConfig } from "@/types";
import utils from "@/utils";

const build = async function (config: BrowserAppConfig): Promise<void> {
  const cwd = process.cwd();
  const outDir = config.outDir ?? "dist";

  utils.logger.step("Building browser application...");

  // 1. Clean output directory
  if (config.clean !== false) {
    utils.logger.step("Cleaning output directory...");
    await rm(path.resolve(cwd, outDir), { recursive: true, force: true });
  }

  // 2. Build with vite
  await viteBuild({
    root: cwd,
    build: {
      outDir,
      sourcemap: config.sourcemap !== false,
      minify: config.minify ?? true,
    },
    ...config.vite,
  });

  utils.logger.success("Browser app build completed successfully");
};

export default build;
