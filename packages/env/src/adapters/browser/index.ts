/// <reference types="vite/client" />
import type { IEnvAdapter } from "@roysupriyo10/types/env";

const browserAdapter: IEnvAdapter = {
  get: function (key: string) {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return import.meta.env[key];
    }

    if (typeof window !== "undefined" && "__ENV__" in window) {
      return (window as unknown as { __ENV__: Record<string, string> }).__ENV__[
        key
      ];
    }

    return undefined;
  },
};

export default browserAdapter;
