import path from "node:path";

export interface ResolvePathAliasOptions {
  paths: Record<string, string[]>;
  baseUrl: string;
}

const resolvePathAlias = function (
  specifier: string,
  options: ResolvePathAliasOptions,
): string | null {
  const { paths, baseUrl } = options;

  for (const [pattern, replacements] of Object.entries(paths)) {
    // Handle exact match: "@/utils" matches "@/*"
    // Handle wildcard: "@/utils/foo" matches "@/*"
    const isWildcard = pattern.endsWith("/*");
    const patternBase = isWildcard ? pattern.slice(0, -2) : pattern;

    if (isWildcard && specifier.startsWith(patternBase + "/")) {
      // Wildcard match: "@/utils/foo" with "@/*" → "utils/foo"
      const remainder = specifier.slice(patternBase.length + 1);
      const replacement = replacements[0];

      if (replacement) {
        const replacementBase = replacement.endsWith("/*")
          ? replacement.slice(0, -2)
          : replacement;
        return path.resolve(baseUrl, replacementBase, remainder);
      }
    } else if (!isWildcard && specifier === pattern) {
      // Exact match
      const replacement = replacements[0];

      if (replacement) {
        return path.resolve(baseUrl, replacement);
      }
    }
  }

  return null;
};

export default resolvePathAlias;
