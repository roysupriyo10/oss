import path from "node:path";

const getDirectory = function (...parameters: Parameters<typeof path.dirname>) {
  return path.dirname(...parameters);
};

export default getDirectory;
