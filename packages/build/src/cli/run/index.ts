import { BuildTarget, type BuildConfig } from "@/types";
import config from "@/config";
import builders from "@/builders";
import utils from "@/utils";

interface RunOptions {
  configPath: string;
  watch?: boolean;
  clean?: boolean;
  sourcemap?: boolean;
  minify?: boolean;
}

const run = async function (options: RunOptions): Promise<void> {
  const { configPath, ...cliOverrides } = options;

  utils.logger.step(`Loading config from ${configPath}...`);

  const fileConfig = await config.loadConfig(configPath);

  // Merge CLI overrides with file config (CLI takes precedence)
  const buildConfig: BuildConfig = {
    ...fileConfig,
    ...(cliOverrides.clean !== undefined && { clean: cliOverrides.clean }),
    ...(cliOverrides.sourcemap !== undefined && {
      sourcemap: cliOverrides.sourcemap,
    }),
    ...(cliOverrides.minify !== undefined && { minify: cliOverrides.minify }),
  };

  utils.logger.info(`Build target: ${buildConfig.target}`);

  // TODO: Handle watch mode
  if (cliOverrides.watch) {
    utils.logger.warn("Watch mode is not yet implemented");
  }

  switch (buildConfig.target) {
    case BuildTarget.NODE_APP:
      await builders.nodeApp(buildConfig);
      break;

    case BuildTarget.PACKAGE:
      await builders.package(buildConfig);
      break;

    case BuildTarget.BROWSER_APP:
      await builders.browserApp(buildConfig);
      break;

    case BuildTarget.FIGMA_PLUGIN:
      await builders.figmaPlugin(buildConfig);
      break;

    case BuildTarget.CHROME_PLUGIN:
      await builders.chromeExtension(buildConfig);
      break;

    default:
      throw new Error(
        `Unknown build target: ${(buildConfig as BuildConfig).target}`,
      );
  }
};

export default run;
