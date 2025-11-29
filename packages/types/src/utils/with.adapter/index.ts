type WithAdapter<T, A> = T extends (...args: infer P) => infer R
  ? (adapter: A, ...args: P) => R
  : never;

export type { WithAdapter };
