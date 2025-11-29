const isBareImport = function (specifier: string): boolean {
  // Bare imports are non-relative, non-absolute imports (node_modules)
  // e.g., "lodash", "@types/node", "typescript"
  // Not: "./foo", "../bar", "/absolute/path"
  return (
    !specifier.startsWith(".") &&
    !specifier.startsWith("/") &&
    !specifier.startsWith("node:")
  );
};

export default isBareImport;
