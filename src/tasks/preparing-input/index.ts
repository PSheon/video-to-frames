import chalk from "chalk";
import ora from "ora";

import { getMetaData } from "./helpers";

export default function (): Promise<void> {
  return new Promise(async (resolve) => {
    const spinner = ora("整理輸入文件中...").start();
    const inputMimeType = global.inputMimeType;

    /* TODO 調整文件流程 */
    if (inputMimeType.includes("video")) {
      await getMetaData({ spinner });
    }
    if (inputMimeType.includes("image")) {
      await getMetaData({ spinner });
    }

    spinner.succeed(`${chalk.green("[階段一]")} 整理文件完成`);
    resolve();
  });
}
