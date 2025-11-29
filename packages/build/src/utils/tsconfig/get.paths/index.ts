import ts from "typescript";

const getPaths = function (
  config: ts.ParsedCommandLine,
): Record<string, string[]> {
  return config.options.paths ?? {};
};

export default getPaths;
