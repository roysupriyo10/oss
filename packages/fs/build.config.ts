import { defineConfig } from "@roysupriyo10/build/config";
import { BuildTarget } from "@roysupriyo10/build/types";

import path from "node:path";

const CURRENT_WORKING_DIRECTORY = process.cwd();

const INDEX_ENTRY_FILE = path.resolve(
  CURRENT_WORKING_DIRECTORY,
  "src",
  "index.ts",
);

export default defineConfig({
  target: BuildTarget.PACKAGE,
  tsconfig: "./tsconfig.lib.json",
  entry: {
    index: INDEX_ENTRY_FILE,
  },
});
