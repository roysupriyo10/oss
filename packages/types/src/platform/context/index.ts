import type { IEnv } from "../../env";

interface IContext {
  env: IEnv;
}

interface IContextGet {
  (): IContext;
  (options: { optional: true }): IContext | null;
  (options: { optional: false }): IContext;
}

interface IContextSet {
  (ctx: IContext): void;
}

export type { IContext, IContextGet, IContextSet };
