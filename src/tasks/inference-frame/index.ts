import ora from "ora";
import chalk from "chalk";

import { inferencePoseProcess } from "./helpers";

export default function (): Promise<void> {
  return new Promise(async (resolve) => {
    const spinner = ora(`${chalk.green("[階段三]")} 推理影片中...`).start();

    const startTime = process.hrtime.bigint();
    await inferencePoseProcess({ spinner });
    const endTime = process.hrtime.bigint();

    console.log(
      `\n🎉 推理總耗時 ${chalk.green(
        Math.round(
          parseInt((endTime - startTime).toString()) / 1000 / 1000 / 1000,
        ),
      )} 秒`,
    );

    spinner.succeed(`${chalk.green("[階段三]")} 影片推理完成！`);
    resolve();
  });
}
