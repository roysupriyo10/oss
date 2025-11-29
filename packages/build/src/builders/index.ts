import nodeApp from "./node.app";
import packageBuilder from "./package";
import browserApp from "./browser.app";
import figmaPlugin from "./figma.plugin";
import chromeExtension from "./chrome.extension";

const builders = {
  nodeApp,
  package: packageBuilder,
  browserApp,
  figmaPlugin,
  chromeExtension,
};

export default builders;
