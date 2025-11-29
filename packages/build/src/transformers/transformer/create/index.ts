import ts from "typescript";

export interface TransformerOptions {
  paths: Record<string, string[]>;
  baseUrl: string;
}

// Cache for resolved specifiers to avoid repeated async resolution
export type ResolveCache = Map<string, string | null>;

const create = function (
  _options: TransformerOptions,
  resolveCache: ResolveCache,
): ts.CustomTransformerFactory {
  return (context) => {
    const transformSourceFile = (sourceFile: ts.SourceFile): ts.SourceFile => {
      const visitor = (node: ts.Node): ts.Node => {
        // Handle: import { x } from "specifier"
        if (ts.isImportDeclaration(node) && node.moduleSpecifier) {
          const newSpecifier = getResolvedSpecifier(
            node.moduleSpecifier,
            sourceFile,
            resolveCache,
          );
          if (newSpecifier) {
            return ts.factory.updateImportDeclaration(
              node,
              node.modifiers,
              node.importClause,
              ts.factory.createStringLiteral(newSpecifier),
              node.attributes,
            );
          }
        }

        // Handle: export { x } from "specifier"
        if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
          const newSpecifier = getResolvedSpecifier(
            node.moduleSpecifier,
            sourceFile,
            resolveCache,
          );
          if (newSpecifier) {
            return ts.factory.updateExportDeclaration(
              node,
              node.modifiers,
              node.isTypeOnly,
              node.exportClause,
              ts.factory.createStringLiteral(newSpecifier),
              node.attributes,
            );
          }
        }

        // Handle: import("specifier") - dynamic imports
        if (
          ts.isCallExpression(node) &&
          node.expression.kind === ts.SyntaxKind.ImportKeyword &&
          node.arguments.length > 0 &&
          ts.isStringLiteral(node.arguments[0]!)
        ) {
          const specifierNode = node.arguments[0] as ts.StringLiteral;
          const cacheKey = `${sourceFile.fileName}:${specifierNode.text}`;
          const resolved = resolveCache.get(cacheKey);

          if (resolved) {
            return ts.factory.updateCallExpression(
              node,
              node.expression,
              node.typeArguments,
              [
                ts.factory.createStringLiteral(resolved),
                ...node.arguments.slice(1),
              ],
            );
          }
        }

        // Handle: type Foo = import("specifier").Bar
        if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
          const literal = node.argument.literal;
          if (ts.isStringLiteral(literal)) {
            const cacheKey = `${sourceFile.fileName}:${literal.text}`;
            const resolved = resolveCache.get(cacheKey);

            if (resolved) {
              return ts.factory.updateImportTypeNode(
                node,
                ts.factory.createLiteralTypeNode(
                  ts.factory.createStringLiteral(resolved),
                ),
                node.attributes,
                node.qualifier,
                node.typeArguments,
                node.isTypeOf,
              );
            }
          }
        }

        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
    };

    return {
      transformSourceFile,
      transformBundle: (bundle) => bundle,
    };
  };
};

const getResolvedSpecifier = function (
  moduleSpecifier: ts.Expression,
  sourceFile: ts.SourceFile,
  resolveCache: ResolveCache,
): string | null {
  if (!ts.isStringLiteral(moduleSpecifier)) {
    return null;
  }

  const cacheKey = `${sourceFile.fileName}:${moduleSpecifier.text}`;
  return resolveCache.get(cacheKey) ?? null;
};

export default create;
