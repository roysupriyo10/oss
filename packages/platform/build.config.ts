import { defineConfig } from "@roysupriyo10/build/config";
import { BuildTarget } from "@roysupriyo10/build/types";
import { Platform } from "@roysupriyo10/types/platform";

import path from "node:path";

const cwd = process.cwd();

export default defineConfig({
  target: BuildTarget.PACKAGE,
  tsconfig: "./tsconfig.lib.json",
  entry: {
    index: path.resolve(cwd, "src", "core", "index.ts"),
  },
  adapters: [
    {
      platform: Platform.NODE,
      tsconfig: "./tsconfig.adapter.node.json",
    },
    {
      platform: Platform.BROWSER,
      tsconfig: "./tsconfig.adapter.browser.json",
    },
    {
      platform: Platform.FIGMA,
      tsconfig: "./tsconfig.adapter.figma.json",
    },
    {
      platform: Platform.CHROME,
      tsconfig: "./tsconfig.adapter.chrome.json",
    },
  ],
});
