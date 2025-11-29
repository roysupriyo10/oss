import ts from "typescript";
import path from "node:path";
import { rm } from "node:fs/promises";
import { type NodeAppConfig } from "@/types";
import utils from "@/utils";
import transformers from "@/transformers";

const build = async function (config: NodeAppConfig): Promise<void> {
  const cwd = process.cwd();
  const outDir = config.outDir ?? "dist";
  const tsconfigPath = config.tsconfig ?? "tsconfig.json";

  utils.logger.step("Loading TypeScript configuration...");

  // 1. Load tsconfig
  const parsed = utils.tsconfig.load(path.resolve(cwd, tsconfigPath));
  const compilerOptions = utils.tsconfig.getCompilerOptions(parsed);
  const paths = utils.tsconfig.getPaths(parsed);
  const baseUrl = utils.tsconfig.getBaseUrl(parsed) ?? cwd;

  // 2. Determine entry files
  let fileNames: string[];
  if (config.entry) {
    const entries = Array.isArray(config.entry) ? config.entry : [config.entry];
    fileNames = entries.map((e) => path.resolve(cwd, e));
  } else {
    fileNames = utils.tsconfig.getFileNames(parsed);
  }

  if (fileNames.length === 0) {
    throw new Error("No input files found");
  }

  utils.logger.info(`Found ${fileNames.length} source file(s)`);

  // 3. Clean output directory
  if (config.clean !== false) {
    utils.logger.step("Cleaning output directory...");
    await rm(path.resolve(cwd, outDir), { recursive: true, force: true });
  }

  // 4. Merge compiler options
  const finalOptions: ts.CompilerOptions = {
    ...compilerOptions,
    ...config.typescript,
    outDir: path.resolve(cwd, outDir),
    declaration: true,
    declarationMap: true,
    sourceMap: config.sourcemap !== false,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
  };

  // 5. Create program
  utils.logger.step("Creating TypeScript program...");
  const program = ts.createProgram(fileNames, finalOptions);

  // 6. Pre-resolve all import specifiers (async)
  utils.logger.step("Resolving import paths...");
  const resolveCache = await transformers.transformer.preResolve(program, {
    paths,
    baseUrl: path.resolve(cwd, baseUrl),
  });

  utils.logger.info(`Resolved ${resolveCache.size} import specifier(s)`);

  // 7. Create transformer
  const transformerFactory = transformers.transformer.create(
    {
      paths,
      baseUrl: path.resolve(cwd, baseUrl),
    },
    resolveCache,
  );

  // 8. Emit with transformer
  utils.logger.step("Emitting output...");
  const emitResult = program.emit(undefined, undefined, undefined, false, {
    before: [transformerFactory],
    afterDeclarations: [transformerFactory],
  });

  // 9. Report diagnostics
  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  if (allDiagnostics.length > 0) {
    allDiagnostics.forEach((diagnostic) => {
      if (diagnostic.file) {
        const { line, character } = ts.getLineAndCharacterOfPosition(
          diagnostic.file,
          diagnostic.start!,
        );
        const message = ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n",
        );
        utils.logger.error(
          `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`,
        );
      } else {
        utils.logger.error(
          ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
        );
      }
    });
  }

  if (emitResult.emitSkipped) {
    throw new Error("TypeScript compilation failed");
  }

  utils.logger.success("Build completed successfully");
};

export default build;
