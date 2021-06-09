import chalk from "chalk";
import ora from "ora";

import { getMergeOutputDirname, mergeFramesToVideo } from "./helpers";

export default function (): Promise<void> {
  return new Promise(async (resolve) => {
    const spinner = ora("生成影片中...").start();
    const fileMimeType = global.fileMimeType;

    const startTime = process.hrtime.bigint();
    if (fileMimeType.includes("video")) {
      await mergeFramesToVideo({ spinner });
    }
    const endTime = process.hrtime.bigint();

    /* tslint:disable:no-console */
    console.log(
      `\n🎉 生成影片總耗時 ${chalk.green(
        Math.round(
          parseInt((endTime - startTime).toString(), 10) / 1000 / 1000 / 1000,
        ),
      )} 秒`,
    );
    console.log(`📁 輸出資料夾 > ${chalk.green(getMergeOutputDirname())}`);
    /* tslint:enable:no-console */

    resolve();
  });
}
