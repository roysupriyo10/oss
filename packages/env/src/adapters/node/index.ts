import type { IEnvAdapter } from "@roysupriyo10/types/env";

const nodeAdapter: IEnvAdapter = {
  get: function (key: string) {
    return process.env[key];
  },
};

export default nodeAdapter;
