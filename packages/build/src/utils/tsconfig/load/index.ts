import ts from "typescript";
import path from "node:path";

const load = function (configPath: string): ts.ParsedCommandLine {
  const absolutePath = path.resolve(configPath);
  const configFile = ts.readConfigFile(absolutePath, ts.sys.readFile);

  if (configFile.error) {
    throw new Error(
      ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n"),
    );
  }

  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(absolutePath),
  );

  if (parsed.errors.length > 0) {
    const messages = parsed.errors
      .map((e) => ts.flattenDiagnosticMessageText(e.messageText, "\n"))
      .join("\n");
    throw new Error(messages);
  }

  return parsed;
};

export default load;
