import ts from "typescript";

const getFileNames = function (parsed: ts.ParsedCommandLine): string[] {
  return parsed.fileNames;
};

export default getFileNames;
