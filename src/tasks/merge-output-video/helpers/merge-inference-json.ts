import PROCESS_ENV from "config";

import { writeFile } from "fs/promises";
import path from "path";
const { combine } = require("combine-json");

export default function (): Promise<void> {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;

    const inferences = await combine(
      path.resolve(baseDirName, "output", "stage-inference"),
    );

    await writeFile(
      path.resolve(baseDirName, "output", "stage-merge", "inference.json"),
      JSON.stringify(
        Object.keys(inferences)
          .sort()
          .reduce((acc, key) => {
            acc[key] = inferences[key];
            return acc;
          }, {}),
      ),
    );

    resolve();
  });
}
