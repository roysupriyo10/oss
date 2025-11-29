import type { IPlatformAdapter } from "@roysupriyo10/types/platform";

const browserAdapter: IPlatformAdapter = {
  isPlatform: function () {
    return typeof window !== "undefined" && typeof document !== "undefined";
  },
  storage: {
    get: function <T>(key: symbol) {
      return (globalThis as unknown as Record<symbol, T>)[key];
    },
    set: function <T>(key: symbol, value: T) {
      (globalThis as unknown as Record<symbol, T>)[key] = value;
    },
  },
};

export default browserAdapter;
