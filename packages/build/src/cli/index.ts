#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import meta from "./meta";
import args from "./args";
import run from "./run";

const main = defineCommand({
  meta,
  args,
  async run({ args: parsedArgs }) {
    await run({
      configPath: parsedArgs.config,
      watch: parsedArgs.watch,
      clean: parsedArgs.clean,
      sourcemap: parsedArgs.sourcemap,
      minify: parsedArgs.minify,
    });
  },
});

runMain(main);
