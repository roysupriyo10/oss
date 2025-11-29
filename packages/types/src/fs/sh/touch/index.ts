type ITouchOptions = { path: string | string[]; recursive?: boolean };

type ITouch = (options: ITouchOptions) => Promise<void>;

export type { ITouch };
