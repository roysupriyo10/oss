import fsp from "node:fs/promises";

const isDirectory = async function (
  ...parameters: Parameters<typeof fsp.stat>
): Promise<boolean> {
  try {
    const statResult = await fsp.stat(...parameters);

    return statResult.isDirectory();
  } catch {
    return false;
  }
};

export default isDirectory;
