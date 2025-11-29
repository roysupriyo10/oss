import ts from "typescript";

const getCompilerOptions = function (
  parsed: ts.ParsedCommandLine,
): ts.CompilerOptions {
  return parsed.options;
};

export default getCompilerOptions;
