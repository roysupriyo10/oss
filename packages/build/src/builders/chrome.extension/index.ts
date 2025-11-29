import { type ChromeExtensionConfig } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const build = async function (_config: ChromeExtensionConfig): Promise<void> {
  throw new Error(
    "Chrome extension build is not yet implemented. Contributions welcome!",
  );
};

export default build;
