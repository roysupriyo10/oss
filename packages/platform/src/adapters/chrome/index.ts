import type { IPlatformAdapter } from "@roysupriyo10/types/platform";

const map = new Map<symbol, unknown>();

const chromeAdapter: IPlatformAdapter = {
  storage: {
    get: function <T>(key: symbol) {
      return map.get(key) as T | undefined;
    },
    set: function <T>(key: symbol, value: T) {
      map.set(key, value);
    },
  },
};

export default chromeAdapter;
