import type { ITouch } from "@roysupriyo10/types/fs";

import dirname from "@/sh/dirname";

import utils from "@roysupriyo10/utils";

import fsp from "node:fs/promises";

const touch: ITouch = async function (parameters) {
  const recursive = parameters.recursive ?? false;

  const paths = Array.isArray(parameters.path)
    ? parameters.path
    : [parameters.path];

  for (let i = 0; i < paths.length; i++) {
    const filePath = paths[i];

    if (filePath === undefined) {
      throw new Error(`element cannot be undefined when iterating over a loop`);
    }

    if (recursive) {
      const dir = dirname(filePath);

      const mkdirResult = await utils.result.withError(
        fsp.mkdir(dir, { recursive: true }),
      );

      if (utils.result.isErr(mkdirResult)) {
        const [mkdirError] = mkdirResult;

        throw mkdirError;
      }
    }

    const writeResult = await utils.result.withError(
      fsp.writeFile(filePath, "", { flag: "a" }),
    );

    if (utils.result.isErr(writeResult)) {
      const [writeError] = writeResult;

      throw writeError;
    }
  }
};

export default touch;
