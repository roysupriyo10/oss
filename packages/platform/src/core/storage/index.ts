import type { IStorage } from "@roysupriyo10/types/platform";

let storage: IStorage | null = null;

const setStorage = function (s: IStorage): void {
  storage = s;
};

const getStorage = function (): IStorage {
  if (storage === null) {
    throw new Error(
      "Platform not initialized. Call platform.init(storage) first.",
    );
  }

  return storage;
};

export { getStorage, setStorage };
