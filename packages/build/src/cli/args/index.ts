const args = {
  config: {
    type: "string" as const,
    alias: "c",
    default: "build.config.ts",
    description: "Path to build config file",
  },
  watch: {
    type: "boolean" as const,
    alias: "w",
    default: false,
    description: "Watch mode (rebuild on changes)",
  },
  clean: {
    type: "boolean" as const,
    default: true,
    description: "Clean output directory before build",
  },
  sourcemap: {
    type: "boolean" as const,
    default: true,
    description: "Generate sourcemaps",
  },
  minify: {
    type: "boolean" as const,
    default: false,
    description: "Minify output",
  },
};

export default args;
