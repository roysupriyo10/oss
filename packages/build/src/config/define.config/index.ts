import { type BuildConfig } from "@/types";

const defineConfig = function <T extends BuildConfig>(config: T): T {
  return config;
};

export default defineConfig;
