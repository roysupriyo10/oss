import { defineConfig } from "tsup";
import path from "node:path";

const CURRENT_WORKING_DIRECTORY = process.cwd();

const CLI_ENTRY_FILE = path.resolve(
  CURRENT_WORKING_DIRECTORY,
  "src",
  "cli",
  "index.ts",
);

const BUILDERS_ENTRY_FILE = path.resolve(
  CURRENT_WORKING_DIRECTORY,
  "src",
  "builders",
  "index.ts",
);

const CONFIG_ENTRY_FILE = path.resolve(
  CURRENT_WORKING_DIRECTORY,
  "src",
  "config",
  "index.ts",
);

const TYPES_ENTRY_FILE = path.resolve(
  CURRENT_WORKING_DIRECTORY,
  "src",
  "types",
  "index.ts",
);

export default defineConfig({
  entry: {
    "cli/index": CLI_ENTRY_FILE,
    "builders/index": BUILDERS_ENTRY_FILE,
    "config/index": CONFIG_ENTRY_FILE,
    "types/index": TYPES_ENTRY_FILE,
  },
  format: ["esm"],
  platform: "node",
  target: "node20",
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  external: ["vite", "typescript", "tsup"],
  esbuildOptions(options) {
    options.alias = { "@": "./src" };
  },
});
