import chalk from "chalk";
import ora from "ora";

import {
  copyFrameFromInference,
  getMergeOutputDirname,
  mergeFramesToVideo,
  mergeInferenceJson,
} from "./helpers";

export default function (): Promise<void> {
  return new Promise(async (resolve) => {
    const spinner = ora("生成影像中...").start();
    const inputMimeType = global.inputMimeType;

    const startTime = process.hrtime.bigint();
    if (inputMimeType.includes("image")) {
      await copyFrameFromInference({ spinner });
    }
    if (inputMimeType.includes("video")) {
      await mergeFramesToVideo({ spinner });
    }
    await mergeInferenceJson();
    const endTime = process.hrtime.bigint();

    spinner.stopAndPersist({
      text: `生成影像總耗時 ${chalk.green(
        Math.round(
          parseInt((endTime - startTime).toString(), 10) / 1000 / 1000 / 1000,
        ),
      )} 秒`,
      symbol: "🎬",
    });
    spinner.stopAndPersist({
      text: `輸出資料夾 > ${chalk.green(getMergeOutputDirname())}`,
      symbol: "📁",
    });
    spinner.succeed(`${chalk.green("[階段四]")} 生成影像完成`);

    resolve();
  });
}
