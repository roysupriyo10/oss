import type { IMv } from "@roysupriyo10/types/fs";

import utils from "@roysupriyo10/utils";

import fsp from "node:fs/promises";

const mv: IMv = async function (parameters) {
  const mvPromises: ReturnType<
    typeof utils.result.withError<Awaited<ReturnType<typeof fsp.rename>>>
  >[] = [];

  if (Array.isArray(parameters.source)) {
    for (let i = 0; i < parameters.source.length; i++) {
      const source = parameters.source[i];

      if (source === undefined) {
        throw new Error(
          `element cannot be undefined when iterating over a loop`,
        );
      }

      mvPromises.push(
        utils.result.withError(fsp.rename(source, parameters.destination)),
      );
    }
  }

  if (typeof parameters.source === "string") {
    mvPromises.push(
      utils.result.withError(
        fsp.rename(parameters.source, parameters.destination),
      ),
    );
  }

  const multipleMvResults = await utils.result.withError(
    Promise.all(mvPromises),
  );

  if (utils.result.isErr(multipleMvResults)) {
    const [multipleMvError] = multipleMvResults;

    throw multipleMvError;
  }

  const [, multipleMvResolved] = multipleMvResults;

  for (let i = 0; i < multipleMvResolved.length; i++) {
    const multipleMvResolvedItem = multipleMvResolved[i];

    if (multipleMvResolvedItem === undefined) {
      throw new Error();
    }

    if (utils.result.isErr(multipleMvResolvedItem)) {
      const [multipleMvResolvedItemError] = multipleMvResolvedItem;

      throw multipleMvResolvedItemError;
    }
  }
};

export default mv;
