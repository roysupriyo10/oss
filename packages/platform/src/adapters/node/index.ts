import type { IPlatformAdapter } from "@roysupriyo10/types/platform";

const nodeAdapter: IPlatformAdapter = {
  isPlatform: function () {
    return (
      typeof process !== "undefined" &&
      typeof process.versions !== "undefined" &&
      typeof process.versions.node !== "undefined"
    );
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

export default nodeAdapter;
