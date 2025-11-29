interface IEnv {
  get: (key: string) => string | undefined;
  getOrThrow: (key: string) => string;
  has: (key: string) => boolean;
}

export type { IEnv };
