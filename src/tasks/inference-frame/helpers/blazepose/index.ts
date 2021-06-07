import { readdir } from "fs/promises";
import path from "path";

import chalk from "chalk";
import { IBlazePoseInferenceInput } from "types";

/* TODO */
export default function ({
  spinner,
  modelName,
}: IBlazePoseInferenceInput): Promise<void> {
  return new Promise(async (resolve) => {
    resolve();
  });
}
