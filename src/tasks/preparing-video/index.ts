import chalk from "chalk";
import ora from "ora";

export default function (): Promise<void> {
  return new Promise(async (resolve) => {
    const spinner = ora("整理輸入文件中...").start();
    const fileMimeType = global["fileMimeType"];

    if (fileMimeType.includes("video")) {
      /* TODO 調整輸入大小 */
    }
    if (fileMimeType.includes("image")) {
      /* TODO 調整輸入大小 */
    }

    spinner.succeed(`${chalk.green("[整理文件]")} 已完成`);
    resolve();
  });
}
