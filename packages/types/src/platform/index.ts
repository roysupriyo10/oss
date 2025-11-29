import type { IPlatformAdapter } from "./adapter";
import type { IDetect } from "./detect";
import type { IInit } from "./init";
import type { IContext, IContextGet, IContextSet } from "./context";

enum Platform {
  FIGMA = "figma",
  CHROME = "chrome-extension",
  NODE = "node",
  BROWSER = "browser",
}

interface IPlatformContext {
  get: IContextGet;
  set: IContextSet;
}

interface IPlatform {
  detect: IDetect;
  init: IInit;
  context: IPlatformContext;
}

export { Platform };
export type {
  IPlatformAdapter,
  IDetect,
  IInit,
  IContext,
  IContextGet,
  IContextSet,
  IPlatformContext,
  IPlatform,
};
