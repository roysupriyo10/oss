import fsp from "node:fs/promises";

const exists = async function (
  ...parameters: Parameters<typeof fsp.access>
): Promise<boolean> {
  try {
    await fsp.access(...parameters);
    return true;
  } catch {
    return false;
  }
};

export default exists;
