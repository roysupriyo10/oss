import load from "./load";
import getPaths from "./get.paths";
import getCompilerOptions from "./get.compiler.options";
import getBaseUrl from "./get.base.url";
import getFileNames from "./get.file.names";

const tsconfig = {
  load,
  getPaths,
  getCompilerOptions,
  getBaseUrl,
  getFileNames,
};

export default tsconfig;
