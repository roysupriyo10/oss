import type { Options as TsupOptions } from "tsup";
import type { UserConfig as ViteConfig } from "vite";
import type { CompilerOptions } from "typescript";
import type { Platform } from "@roysupriyo10/types";
import type { BuildTarget } from "@/types/target";

/** Base configuration shared by all build targets */
interface BaseConfig {
  /** Output directory (default: "dist") */
  outDir?: string;

  /** Whether to clean the output folder before building (default: true) */
  clean?: boolean;

  /** Whether to generate sourcemaps (default: true) */
  sourcemap?: boolean;

  /** Whether to minify the output (default: false) */
  minify?: boolean;

  /** Override TypeScript compiler options */
  typescript?: CompilerOptions;
}

/** Configuration for building publishable packages/libraries */
interface PackageConfig extends BaseConfig {
  target: typeof BuildTarget.PACKAGE;

  /** Entry points for the package (default: auto-detected from src/core, src/adapters/*) */
  entry?: TsupOptions["entry"];

  /** Adapter platforms to build (builds each as separate entry) */
  adapters?: Platform[];

  /** Whether to generate declaration files (default: true) */
  dts?: boolean;

  /** Path to tsconfig.json (default: "tsconfig.json") */
  tsconfig?: string;

  /** Escape hatch for tsup configuration */
  tsup?: Omit<TsupOptions, "entry" | "outDir">;
}

/** Configuration for building Node.js applications */
interface NodeAppConfig extends BaseConfig {
  target: typeof BuildTarget.NODE_APP;

  /** Entry point(s) (default: "src/index.ts" or "src/**\/*.ts") */
  entry?: string | string[];

  /** Path to tsconfig.json (default: "tsconfig.json") */
  tsconfig?: string;
}

/** Configuration for building browser applications (SPAs) */
interface BrowserAppConfig extends BaseConfig {
  target: typeof BuildTarget.BROWSER_APP;

  /** Framework hint for default plugins */
  framework?: "react" | "vue" | "svelte" | "vanilla";

  /** Escape hatch for vite configuration */
  vite?: Omit<ViteConfig, "root">;
}

/** Configuration for Figma plugins (not yet implemented) */
interface FigmaPluginConfig extends BaseConfig {
  target: typeof BuildTarget.FIGMA_PLUGIN;

  /** Main entry point (plugin sandbox) */
  main?: string;

  /** UI entry point (iframe) */
  ui?: string;
}

/** Configuration for Chrome extensions (not yet implemented) */
interface ChromeExtensionConfig extends BaseConfig {
  target: typeof BuildTarget.CHROME_PLUGIN;

  /** Manifest version (default: 3) */
  manifestVersion?: 2 | 3;

  /** Background script entry */
  background?: string;

  /** Content scripts entries */
  contentScripts?: string[];

  /** Popup entry */
  popup?: string;

  /** Options page entry */
  options?: string;
}

/** Union type of all build configurations - discriminated by target */
type BuildConfig =
  | PackageConfig
  | NodeAppConfig
  | BrowserAppConfig
  | FigmaPluginConfig
  | ChromeExtensionConfig;

export type {
  BaseConfig,
  PackageConfig,
  NodeAppConfig,
  BrowserAppConfig,
  FigmaPluginConfig,
  ChromeExtensionConfig,
  BuildConfig,
};
