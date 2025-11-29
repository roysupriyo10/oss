import { build as tsupBuild } from "tsup";
import path from "node:path";
import { rm } from "node:fs/promises";
import { type PackageConfig } from "@/types";
import utils from "@/utils";

const build = async function (config: PackageConfig): Promise<void> {
  const cwd = process.cwd();
  const outDir = config.outDir ?? "dist";
  const tsconfigPath = config.tsconfig ?? "tsconfig.json";

  utils.logger.step("Building package...");

  // 1. Clean output directory
  if (config.clean !== false) {
    utils.logger.step("Cleaning output directory...");
    await rm(path.resolve(cwd, outDir), { recursive: true, force: true });
  }

  // 2. Determine entry points
  let entry = config.entry;

  if (!entry) {
    // Auto-detect: src/index.ts or src/core/index.ts
    const defaultEntries = ["src/index.ts", "src/core/index.ts"];

    for (const e of defaultEntries) {
      const exists = await utils.fs.exists(path.resolve(cwd, e));

      if (exists) {
        entry = { index: e };
        break;
      }
    }
  }

  if (!entry) {
    throw new Error("No entry point found. Specify entry in config.");
  }

  utils.logger.info(`Entry: ${JSON.stringify(entry)}`);

  // 3. Load tsconfig and extract path aliases
  const tsconfig = utils.tsconfig.load(path.resolve(cwd, tsconfigPath));
  const paths = utils.tsconfig.getPaths(tsconfig);
  const baseUrl = utils.tsconfig.getBaseUrl(tsconfig) ?? ".";

  // Convert tsconfig paths to esbuild aliases
  const alias: Record<string, string> = {};

  for (const [key, values] of Object.entries(paths)) {
    if (values && values.length > 0) {
      // Remove trailing /* from key and value
      const aliasKey = key.replace(/\/\*$/, "");
      const aliasValue = values[0]?.replace(/\/\*$/, "") ?? "";
      alias[aliasKey] = path.resolve(cwd, baseUrl, aliasValue);
    }
  }

  utils.logger.info(`Paths from tsconfig: ${JSON.stringify(paths)}`);
  utils.logger.info(`BaseUrl: ${baseUrl}`);
  utils.logger.info(`Resolved aliases: ${JSON.stringify(alias)}`);

  // 4. Build with tsup
  await tsupBuild({
    entry,
    outDir,
    format: ["esm"],
    dts: config.dts !== false,
    sourcemap: config.sourcemap !== false,
    minify: config.minify ?? false,
    clean: false, // Already cleaned above
    tsconfig: tsconfigPath,
    esbuildOptions(options) {
      options.alias = { ...alias, ...options.alias };
    },
    ...config.tsup,
  });

  // 5. Build adapters if specified
  if (config.adapters && config.adapters.length > 0) {
    utils.logger.step("Building adapters...");

    for (const adapterConfig of config.adapters) {
      const adapterEntry =
        adapterConfig.entry ??
        `src/adapters/${adapterConfig.platform}/index.ts`;
      const adapterExists = await utils.fs.exists(
        path.resolve(cwd, adapterEntry),
      );

      if (!adapterExists) {
        utils.logger.warn(`Adapter not found: ${adapterEntry}`);
        continue;
      }

      utils.logger.info(`Building adapter: ${adapterConfig.platform}`);

      // Load adapter-specific tsconfig if provided
      const adapterTsconfigPath = adapterConfig.tsconfig ?? tsconfigPath;
      const adapterTsconfig = utils.tsconfig.load(
        path.resolve(cwd, adapterTsconfigPath),
      );
      const adapterPaths = utils.tsconfig.getPaths(adapterTsconfig);
      const adapterBaseUrl = utils.tsconfig.getBaseUrl(adapterTsconfig) ?? ".";

      // Convert adapter tsconfig paths to esbuild aliases
      const adapterAlias: Record<string, string> = {};

      for (const [key, values] of Object.entries(adapterPaths)) {
        if (values && values.length > 0) {
          const aliasKey = key.replace(/\/\*$/, "");
          const aliasValue = values[0]?.replace(/\/\*$/, "") ?? "";
          adapterAlias[aliasKey] = path.resolve(
            cwd,
            adapterBaseUrl,
            aliasValue,
          );
        }
      }

      await tsupBuild({
        entry: { index: adapterEntry },
        outDir: `${outDir}/adapters/${adapterConfig.platform}`,
        format: ["esm"],
        dts: config.dts !== false,
        sourcemap: config.sourcemap !== false,
        minify: config.minify ?? false,
        clean: false,
        tsconfig: adapterTsconfigPath,
        esbuildOptions(options) {
          options.alias = { ...adapterAlias, ...options.alias };
        },
        ...config.tsup,
      });
    }
  }

  utils.logger.success("Package build completed successfully");
};

export default build;
