import type { IMkdir } from "@roysupriyo10/types/fs";

import utils from "@roysupriyo10/utils";

import fsp from "node:fs/promises";

const mkdir: IMkdir = async function (parameters, options) {
  const mkdirPromises: ReturnType<
    typeof utils.result.withError<Awaited<ReturnType<typeof fsp.mkdir>>>
  >[] = [];

  if (Array.isArray(parameters.path)) {
    for (let i = 0; i < parameters.path.length; i++) {
      const path = parameters.path[i];

      if (path === undefined) {
        throw new Error(
          `element cannot be undefined when iterating over a loop`,
        );
      }

      mkdirPromises.push(utils.result.withError(fsp.mkdir(path, options)));
    }
  }

  if (typeof parameters.path === "string") {
    mkdirPromises.push(
      utils.result.withError(fsp.mkdir(parameters.path, options)),
    );
  }

  const multipleMkdirResults = await utils.result.withError(
    Promise.all(mkdirPromises),
  );

  if (utils.result.isErr(multipleMkdirResults)) {
    const [multipleMkdirError] = multipleMkdirResults;

    throw multipleMkdirError;
  }

  const [, multipleMkdirResolved] = multipleMkdirResults;

  for (let i = 0; i < multipleMkdirResolved.length; i++) {
    const multipleMkdirResolvedItem = multipleMkdirResolved[i];

    if (multipleMkdirResolvedItem === undefined) {
      throw new Error();
    }

    if (utils.result.isErr(multipleMkdirResolvedItem)) {
      const [multipleMkdirResolvedItemError] = multipleMkdirResolvedItem;

      throw multipleMkdirResolvedItemError;
    }
  }
};

export default mkdir;
