import type { IEnv } from "../env";

interface IContext {
  env: IEnv;
}

interface IGet {
  (): IContext;
  (options: { optional: true }): IContext | null;
  (options: { optional: false }): IContext;
}

interface ISet {
  (ctx: IContext): void;
}

export type { IContext, IGet, ISet };
