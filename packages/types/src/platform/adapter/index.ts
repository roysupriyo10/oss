interface IPlatformAdapter {
  isPlatform: () => boolean;
  storage: {
    get: <T>(key: symbol) => T | undefined;
    set: <T>(key: symbol, value: T) => void;
  };
}

export type { IPlatformAdapter };
