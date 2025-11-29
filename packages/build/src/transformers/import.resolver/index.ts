import isNodeBuiltin from "./is.node.builtin";
import isBareImport from "./is.bare.import";
import resolvePathAlias from "./resolve.path.alias";
import resolveExtension from "./resolve.extension";
import toRelative from "./to.relative";
import toJsExtension from "./to.js.extension";
import resolve from "./resolve";

const importResolver = {
  isNodeBuiltin,
  isBareImport,
  resolvePathAlias,
  resolveExtension,
  toRelative,
  toJsExtension,
  resolve,
};

export default importResolver;
