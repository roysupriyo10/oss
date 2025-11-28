import type { Options as TsupOptions } from "tsup";
import type {} from "vite";
import type { Platform } from "@roysupriyo10/types";
import type { BuildTarget } from "@/types/target";

/** This is the basic interface that can be extended with escape hatches */
interface BaseConfig {
  /** Output directory ( will default ot "dist" ) */
  outDir?: string;

  /** Whether to rimraf the dist folder before building ( will default to true ) */
  clean?: boolean;

  /** Whether to generate sourcemaps ( will default to true ) */
  sourcemap?: boolean;

  /** Whether to minify the resultant output if it was bundled ( stage based configuration , stage === Stage.DEVELOPMENT ? true : false ) */
  minify?: boolean;
}

/** This is the interface that is required for building packages */
interface PackageConfig extends BaseConfig {
  /** This is the build target */
  target: BuildTarget.PACKAGE;

  /** Adapters to build for, will have additional logic to bundle based on the adapters being created in the package */
  adapters?: Platform[];

  /** Move this option in the main configuration */
  entry?: TsupOptions["entry"];

  /** Escape hatch for overriding tsup configuration */
  tsup?: Omit<TsupOptions, "entry" | "outDir">;
}
