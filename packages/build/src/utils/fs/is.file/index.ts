import fsp from "node:fs/promises";

const isFile = async function (
  ...parameters: Parameters<typeof fsp.stat>
): Promise<boolean> {
  try {
    const statResult = await fsp.stat(...parameters);

    return statResult.isFile();
  } catch {
    return false;
  }
};

export default isFile;
