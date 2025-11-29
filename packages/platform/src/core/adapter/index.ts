import type { IPlatformAdapter } from "@roysupriyo10/types/platform";

let adapter: IPlatformAdapter | null = null;

const setAdapter = function (a: IPlatformAdapter): void {
  adapter = a;
};

const getAdapter = function (): IPlatformAdapter {
  if (adapter === null) {
    throw new Error(
      "Platform not initialized. Call platform.init(adapter) first.",
    );
  }

  return adapter;
};

export { getAdapter, setAdapter };
