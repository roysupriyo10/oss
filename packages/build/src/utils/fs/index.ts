import isFile from "./is.file";
import isDirectory from "./is.directory";
import exists from "./exists";
import resolveFilePath from "./resolve.file.path";
import getDirectory from "./get.directory";

const fs = {
  isFile,
  isDirectory,
  exists,
  resolveFilePath,
  getDirectory,
};

export default fs;
