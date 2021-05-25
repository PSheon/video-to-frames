import PROCESS_ENV from "config";

import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";

export default function (): Promise<void> {
  return new Promise((resolve) => {
    const spinner = ora("準備影片中...").start();
    const baseDirName = global["baseDirName"];

    if (
      !fs.existsSync(
        path.resolve(
          baseDirName,
          PROCESS_ENV.get("INPUT_VIDEO_PATH"),
          PROCESS_ENV.get("INPUT_VIDEO_FILENAME"),
        ),
      )
    ) {
      spinner.fail(
        `請確認 ${chalk.yellow(
          PROCESS_ENV.get("INPUT_VIDEO_FILENAME"),
        )} 放在路徑 ${chalk.yellow(
          path.resolve(baseDirName, PROCESS_ENV.get("INPUT_VIDEO_PATH")),
        )} 下.`,
      );
      process.exit(1);
    }

    spinner.succeed(`${chalk.green("[準備影片]")} 已完成`);
    resolve();
  });
}
