import path from "node:path";

const toRelative = function (absolutePath: string, fromFile: string): string {
  const fromDir = path.dirname(fromFile);
  let relative = path.relative(fromDir, absolutePath);

  // Ensure it starts with ./ or ../
  if (!relative.startsWith(".")) {
    relative = "./" + relative;
  }

  return relative;
};

export default toRelative;
