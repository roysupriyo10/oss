import ts from "typescript";
import importResolver from "@/transformers/import.resolver";

export interface PreResolveOptions {
  paths: Record<string, string[]>;
  baseUrl: string;
}

export type ResolveCache = Map<string, string | null>;

const preResolve = async function (
  program: ts.Program,
  options: PreResolveOptions,
): Promise<ResolveCache> {
  const cache: ResolveCache = new Map();
  const sourceFiles = program.getSourceFiles();

  for (const sourceFile of sourceFiles) {
    // Skip declaration files and node_modules
    if (sourceFile.isDeclarationFile) continue;
    if (sourceFile.fileName.includes("node_modules")) continue;

    const specifiers = collectSpecifiers(sourceFile);

    for (const specifier of specifiers) {
      const cacheKey = `${sourceFile.fileName}:${specifier}`;

      if (cache.has(cacheKey)) continue;

      const resolved = await importResolver.resolve(
        specifier,
        sourceFile.fileName,
        options,
      );

      cache.set(cacheKey, resolved);
    }
  }

  return cache;
};

const collectSpecifiers = function (sourceFile: ts.SourceFile): string[] {
  const specifiers: string[] = [];

  const visit = (node: ts.Node): void => {
    // import { x } from "specifier"
    if (ts.isImportDeclaration(node) && node.moduleSpecifier) {
      if (ts.isStringLiteral(node.moduleSpecifier)) {
        specifiers.push(node.moduleSpecifier.text);
      }
    }

    // export { x } from "specifier"
    if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      if (ts.isStringLiteral(node.moduleSpecifier)) {
        specifiers.push(node.moduleSpecifier.text);
      }
    }

    // import("specifier")
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length > 0
    ) {
      const firstArgument = node.arguments[0];

      if (firstArgument !== undefined && ts.isStringLiteral(firstArgument)) {
        specifiers.push(firstArgument.text);
      }
    }

    // type Foo = import("specifier").Bar
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      const literal = node.argument.literal;
      if (ts.isStringLiteral(literal)) {
        specifiers.push(literal.text);
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return specifiers;
};

export default preResolve;
