enum SourceExtension {
  TypeScript = ".ts",
  TypeScriptReact = ".tsx",
  ModuleTypeScript = ".mts",
  CommonJsTypeScript = ".cts",
  JavaScript = ".js",
  JavaScriptReact = ".jsx",
  ModuleJavaScript = ".mjs",
  CommonJavaScript = ".cjs",
}

enum OutputExtension {
  JavaScript = ".js",
  JavaScriptReact = ".jsx",
  ModuleJavaScript = ".mjs",
  CommonJavaScript = ".cjs",
}

const extensionMap: Record<SourceExtension, OutputExtension> = {
  [SourceExtension.TypeScript]: OutputExtension.JavaScript,
  [SourceExtension.TypeScriptReact]: OutputExtension.JavaScript,
  [SourceExtension.ModuleTypeScript]: OutputExtension.ModuleJavaScript,
  [SourceExtension.CommonJsTypeScript]: OutputExtension.CommonJavaScript,
  [SourceExtension.JavaScript]: OutputExtension.JavaScript,
  [SourceExtension.JavaScriptReact]: OutputExtension.JavaScriptReact,
  [SourceExtension.ModuleJavaScript]: OutputExtension.ModuleJavaScript,
  [SourceExtension.CommonJavaScript]: OutputExtension.CommonJavaScript,
};

export { SourceExtension, OutputExtension, extensionMap };
