import path from "node:path";
import fs from "@/utils/fs";
import constants from "@/constants";

export interface ResolveExtensionOptions {
  extensions?: string[];
}

const resolveExtension = async function (
  absolutePath: string,
  options: ResolveExtensionOptions = {},
): Promise<{ resolved: string; isDirectory: boolean } | null> {
  const extensions = options.extensions ?? constants.extensions;

  // Check if already has a valid extension
  const currentExt = path.extname(absolutePath);
  if (extensions.includes(currentExt)) {
    const isFile = await fs.isFile(absolutePath);
    if (isFile) {
      return { resolved: absolutePath, isDirectory: false };
    }
  }

  // Try adding extensions
  for (const ext of extensions) {
    const withExt = absolutePath + ext;
    const isFile = await fs.isFile(withExt);
    if (isFile) {
      return { resolved: withExt, isDirectory: false };
    }
  }

  // Try as directory with index file
  const isDir = await fs.isDirectory(absolutePath);
  if (isDir) {
    for (const ext of extensions) {
      const indexPath = path.resolve(absolutePath, `index${ext}`);
      const isFile = await fs.isFile(indexPath);
      if (isFile) {
        return { resolved: indexPath, isDirectory: true };
      }
    }
  }

  return null;
};

export default resolveExtension;
