import ts from "typescript";

const getBaseUrl = function (config: ts.ParsedCommandLine): string | undefined {
  return config.options.baseUrl;
};

export default getBaseUrl;
