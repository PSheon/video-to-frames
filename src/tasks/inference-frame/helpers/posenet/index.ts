import { readdir } from "fs/promises";
import path from "path";

import chalk from "chalk";
import { IPoseNetInferenceInput } from "types";

import inferencePose from "./inferencePose";

export default function ({ spinner }: IPoseNetInferenceInput): Promise<void> {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;
    const frames = await readdir(
      path.resolve(baseDirName, "output", "stage-split"),
    );

    let skipFrames = 0;

    for (const [inferenceIndex, frame] of frames.entries()) {
      if (!frame.includes(".jpg")) {
        skipFrames++;
        continue;
      }

      const { inferenceTime, processTime } = await inferencePose({ frame });

      spinner.text = `🔍 推理第 ${chalk.green(
        `${inferenceIndex + skipFrames} / ${frames.length}`,
      )} 張圖片，跳過 ${chalk.yellow(skipFrames)} 張，花費 ${chalk.green(
        inferenceTime,
      )} 毫秒，解構 ${chalk.green(processTime)} 毫秒`;
    }

    resolve();
  });
}
