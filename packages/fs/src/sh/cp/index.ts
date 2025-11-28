import type { ICp } from "@roysupriyo10/types/fs";

import utils from "@roysupriyo10/utils";

import fsp from "node:fs/promises";

const cp: ICp = async function (parameters, options) {
  const copyPromises: ReturnType<
    typeof utils.result.withError<Awaited<ReturnType<typeof fsp.cp>>>
  >[] = [];

  if (Array.isArray(parameters.source)) {
    for (let i = 0; i < parameters.source.length; i++) {
      const source = parameters.source[i];

      if (source === undefined) {
        throw new Error(
          `element cannot be undefined when iterating over a loop`,
        );
      }

      copyPromises.push(
        utils.result.withError(fsp.cp(source, parameters.destination, options)),
      );
    }
  }

  if (typeof parameters.source === "string") {
    copyPromises.push(
      utils.result.withError(
        fsp.cp(parameters.source, parameters.destination, options),
      ),
    );
  }

  const multipleCopyResults = await utils.result.withError(
    Promise.all(copyPromises),
  );

  if (utils.result.isErr(multipleCopyResults)) {
    const [multipleCopyError] = multipleCopyResults;

    throw multipleCopyError;
  }

  const [, multipleCopyResolved] = multipleCopyResults;

  for (let i = 0; i < multipleCopyResolved.length; i++) {
    const multipleCopyResolvedItem = multipleCopyResolved[i];

    if (multipleCopyResolvedItem === undefined) {
      throw new Error();
    }

    if (utils.result.isErr(multipleCopyResolvedItem)) {
      const [multipleCopyResolvedItemError] = multipleCopyResolvedItem;

      throw multipleCopyResolvedItemError;
    }
  }
};

export default cp;
