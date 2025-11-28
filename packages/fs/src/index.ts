import { type IFs } from "@roysupriyo10/types/fs";

import workspace from "./workspace";
import package_ from "./package";
import sh from "./sh";
import exists from "./exists";

const fs: IFs = {
  exists,
  sh,
  workspace,
  package: package_,
};

export default fs;
