import path from "node:path";
import { pathToFileURL } from "node:url";
import { type BuildConfig } from "@/types";

const loadConfig = async function (configPath: string): Promise<BuildConfig> {
  const absolutePath = path.resolve(process.cwd(), configPath);
  const fileUrl = pathToFileURL(absolutePath).href;

  const module = await import(fileUrl);

  if (!module.default) {
    throw new Error(`Config file must have a default export: ${configPath}`);
  }

  return module.default as BuildConfig;
};

export default loadConfig;
