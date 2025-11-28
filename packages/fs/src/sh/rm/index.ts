import type { IRm } from "@roysupriyo10/types/fs";

import utils from "@roysupriyo10/utils";

import fsp from "node:fs/promises";

const rm: IRm = async function (parameters, options) {
  const rmPromises: ReturnType<
    typeof utils.result.withError<Awaited<ReturnType<typeof fsp.rm>>>
  >[] = [];

  if (Array.isArray(parameters.path)) {
    for (let i = 0; i < parameters.path.length; i++) {
      const path = parameters.path[i];

      if (path === undefined) {
        throw new Error(
          `element cannot be undefined when iterating over a loop`,
        );
      }

      rmPromises.push(utils.result.withError(fsp.rm(path, options)));
    }
  }

  if (typeof parameters.path === "string") {
    rmPromises.push(utils.result.withError(fsp.rm(parameters.path, options)));
  }

  const multipleRmResults = await utils.result.withError(
    Promise.all(rmPromises),
  );

  if (utils.result.isErr(multipleRmResults)) {
    const [multipleRmError] = multipleRmResults;

    throw multipleRmError;
  }

  const [, multipleRmResolved] = multipleRmResults;

  for (let i = 0; i < multipleRmResolved.length; i++) {
    const multipleRmResolvedItem = multipleRmResolved[i];

    if (multipleRmResolvedItem === undefined) {
      throw new Error();
    }

    if (utils.result.isErr(multipleRmResolvedItem)) {
      const [multipleRmResolvedItemError] = multipleRmResolvedItem;

      throw multipleRmResolvedItemError;
    }
  }
};

export default rm;
