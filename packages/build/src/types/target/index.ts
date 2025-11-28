/**
 * basic targets for which our build package will handle the bundling/transpilation
 * will add more targets as required
 */
enum BuildTarget {
  PACKAGE = "PACKAGE",
  NODE_APP = "NODE_APP",
  BROWSER_APP = "BROWSER_APP",
  FIGMA_PLUGIN = "FIGMA_PLUGIN",
  CHROME_PLUGIN = "CHROME_PLUGIN",
}

export { BuildTarget };
