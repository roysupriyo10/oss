interface IEnvAdapter {
  get: (key: string) => string | undefined;
}

export type { IEnvAdapter };
