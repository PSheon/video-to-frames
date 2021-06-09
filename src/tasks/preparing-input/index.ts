import chalk from "chalk";
import ora from "ora";

import { getMetaData } from "./helpers";

export default function (): Promise<void> {
  return new Promise(async (resolve) => {
    const spinner = ora("整理輸入文件中...").start();
    const fileMimeType = global.fileMimeType;

    /* TODO 調整文件流程 */
    if (fileMimeType.includes("video")) {
      await getMetaData({ spinner });
    }
    if (fileMimeType.includes("image")) {
      await getMetaData({ spinner });
    }

    spinner.succeed(`${chalk.green("[階段一]")} 整理文件完成`);
    resolve();
  });
}
