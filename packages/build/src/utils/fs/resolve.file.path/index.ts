import constants from "@/constants";
import path from "node:path";

import isFile from "@/utils/fs/is.file";
import isDirectory from "@/utils/fs/is.directory";

const resolveFilePath = async function (
  specifier: string,
  fromDir: string,
  extensions: string[] = structuredClone(constants.extensions),
) {
  const basePath = path.resolve(fromDir, specifier);

  const isBasePathFile = await isFile(basePath);

  if (isBasePathFile) {
    return basePath;
  }

  for (const extension of extensions) {
    const withExtension = basePath.concat(extension);

    const isWithExtensionFile = await isFile(withExtension);

    if (isWithExtensionFile) {
      return withExtension;
    }
  }

  const isBasePathDirectory = await isDirectory(basePath);

  if (isBasePathDirectory) {
    for (const extension of extensions) {
      const indexPath = path.resolve(basePath, `index${extension}`);

      const isIndexPathFile = await isFile(indexPath);

      if (isIndexPathFile) {
        return indexPath;
      }
    }
  }

  return null;
};

export default resolveFilePath;
