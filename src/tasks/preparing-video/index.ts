import PROCESS_ENV from "config";

import path from "path";
import chalk from "chalk";
import ora from "ora";
import FileType, { FileTypeResult } from "file-type";

export default function (): Promise<void> {
  return new Promise(async (resolve) => {
    const spinner = ora("準備影片中...").start();
    const baseDirName = global["baseDirName"];

    const { mime } = (await FileType.fromFile(
      path.resolve(
        baseDirName,
        PROCESS_ENV.get("INPUT_FILEPATH"),
        PROCESS_ENV.get("INPUT_FILENAME"),
      ),
    )) as FileTypeResult;

    console.log("mime, ", mime);

    /* TODO 調整輸入大小 */

    spinner.succeed(`${chalk.green("[準備影片]")} 已完成`);
    resolve();
  });
}
