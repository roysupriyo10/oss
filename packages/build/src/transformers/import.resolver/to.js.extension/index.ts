import path from "node:path";
import { SourceExtension, extensionMap } from "@/types";

const toJsExtension = function (filePath: string): string {
  const ext = path.extname(filePath) as SourceExtension;

  const outputExt = extensionMap[ext];

  if (outputExt) {
    return filePath.slice(0, -ext.length) + outputExt;
  }

  // Unknown extension - return as-is
  return filePath;
};

export default toJsExtension;
