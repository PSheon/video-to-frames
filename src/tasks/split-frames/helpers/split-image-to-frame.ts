import PROCESS_ENV from "config";

import path from "path";

import chalk from "chalk";
import ffmpeg from "fluent-ffmpeg";

import { ISplitImageToFrameInput } from "../../../types";

export default function ({ spinner }: ISplitImageToFrameInput): Promise<void> {
  return new Promise((resolve) => {
    const baseDirName = global.baseDirName;

    ffmpeg(
      path.resolve(
        baseDirName,
        PROCESS_ENV.get("INPUT_FILEPATH"),
        PROCESS_ENV.get("INPUT_FILENAME"),
      ),
    )
      .on("error", (err) => {
        spinner.fail(`${chalk.red("[階段二]")} 分割圖片失敗: ${err.message}`);
        process.exit(1);
      })
      .on("end", () => {
        spinner.succeed(`${chalk.green("[階段二]")} 分割圖片完成！`);
        resolve();
      })
      .size("640x?")
      .aspect("1:1")
      .autopad()
      .save(
        path.resolve(
          baseDirName,
          "output",
          "stage-split",
          `${PROCESS_ENV.get("SPLIT_FRAME_IMAGE_PREFIX")}_%05d.jpg`,
        ),
      );
  });
}
