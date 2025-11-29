import type { IDetect } from "@roysupriyo10/types/platform";
import { Platform } from "@roysupriyo10/types/platform";

const detect: IDetect = function () {
  // @ts-expect-error: figma typings are not assumed in the core package, the usage of typeof is safe here
  if (typeof figma !== "undefined") {
    return Platform.FIGMA;
  }

  if (
    typeof chrome !== "undefined" &&
    typeof chrome.runtime !== "undefined" &&
    typeof chrome.runtime.id !== "undefined"
  ) {
    return Platform.CHROME;
  }

  if (
    typeof process !== "undefined" &&
    typeof process.versions !== "undefined" &&
    typeof process.versions.node !== "undefined"
  ) {
    return Platform.NODE;
  }

  return Platform.BROWSER;
};

export default detect;
