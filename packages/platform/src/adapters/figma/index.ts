import type { IPlatformAdapter } from "@roysupriyo10/types/platform";

const map = new Map<symbol, unknown>();

const figmaAdapter: IPlatformAdapter = {
  isPlatform: function () {
    return typeof figma !== "undefined";
  },
  storage: {
    get: function <T>(key: symbol) {
      return map.get(key) as T | undefined;
    },
    set: function <T>(key: symbol, value: T) {
      map.set(key, value);
    },
  },
};

export default figmaAdapter;
