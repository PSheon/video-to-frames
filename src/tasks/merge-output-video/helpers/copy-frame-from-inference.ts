import PROCESS_ENV from "config";

import path from "path";

import chalk from "chalk";
import ffmpeg from "fluent-ffmpeg";

export default function ({ spinner }): Promise<void> {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;

    ffmpeg(
      path.resolve(
        baseDirName,
        "output",
        "stage-inference",
        `${PROCESS_ENV.get("SPLIT_FRAME_IMAGE_PREFIX")}_%05d.jpg`,
      ),
    )
      .on("error", (err) => {
        spinner.fail(`${chalk.red("[階段四]")} 生成圖片失敗: ${err.message}`);
        process.exit(1);
      })
      .on("end", () => {
        spinner.succeed(`${chalk.green("[階段二]")} 分割圖片完成！`);
        resolve();
      })
      .save(
        path.resolve(baseDirName, "output", "stage-merge", "frame_00001.jpg"),
      );
  });
}
