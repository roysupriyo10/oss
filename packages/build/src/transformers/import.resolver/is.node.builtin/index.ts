import { builtinModules } from "node:module";

const nodeBuiltins = new Set([
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
]);

const isNodeBuiltin = function (specifier: string): boolean {
  return nodeBuiltins.has(specifier);
};

export default isNodeBuiltin;
