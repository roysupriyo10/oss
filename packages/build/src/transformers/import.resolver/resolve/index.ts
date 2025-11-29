import path from "node:path";
import isNodeBuiltin from "../is.node.builtin";
import isBareImport from "../is.bare.import";
import resolvePathAlias from "../resolve.path.alias";
import resolveExtension from "../resolve.extension";
import toRelative from "../to.relative";
import toJsExtension from "../to.js.extension";

export interface ResolveOptions {
  paths: Record<string, string[]>;
  baseUrl: string;
}

const resolve = async function (
  specifier: string,
  importerPath: string,
  options: ResolveOptions,
): Promise<string | null> {
  // 1. Skip node builtins - leave unchanged
  if (isNodeBuiltin(specifier)) {
    return null;
  }

  // 2. Skip bare imports (node_modules) - leave unchanged
  if (isBareImport(specifier)) {
    return null;
  }

  const importerDir = path.dirname(importerPath);
  let absolutePath: string;

  // 3. Try to resolve path alias
  const aliasResolved = resolvePathAlias(specifier, {
    paths: options.paths,
    baseUrl: options.baseUrl,
  });

  if (aliasResolved) {
    absolutePath = aliasResolved;
  } else if (specifier.startsWith(".")) {
    // 4. Relative import - resolve from importer directory
    absolutePath = path.resolve(importerDir, specifier);
  } else {
    // Unknown specifier type - leave unchanged
    return null;
  }

  // 5. Resolve file extension (handles .ts → .js and directory → index.js)
  const extensionResult = await resolveExtension(absolutePath);

  if (!extensionResult) {
    // Could not resolve - leave unchanged (will error at runtime)
    return null;
  }

  // 6. Convert to relative path from importer
  const relativePath = toRelative(extensionResult.resolved, importerPath);

  // 7. Convert TS extension to JS extension
  const withJsExtension = toJsExtension(relativePath);

  return withJsExtension;
};

export default resolve;
