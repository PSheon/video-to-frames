import PROCESS_ENV from "config";
import path from "path";
import chalk from "chalk";
import ffmpeg from "fluent-ffmpeg";

import { ISplitVideoToFramesInput } from "../../../types";

export default function ({ spinner }: ISplitVideoToFramesInput): Promise<void> {
  return new Promise((resolve) => {
    const baseDirName = global["baseDirName"];

    ffmpeg(
      path.resolve(
        baseDirName,
        PROCESS_ENV.get("INPUT_FILEPATH"),
        PROCESS_ENV.get("INPUT_FILENAME"),
      ),
    )
      .on("codecData", (data) => {
        spinner.text = `Input is ${data.audio} audio with ${data.video} video"`;
      })
      .on("error", (err) => {
        spinner.fail(`${chalk.red("[階段二]")} 分割影片失敗: ${err.message}`);
        process.exit(1);
      })
      .on("end", () => {
        spinner.succeed(`${chalk.green("[階段二]")} 分割影片完成！`);
        resolve();
      })
      .size("640x?")
      .aspect("1:1")
      .autopad()
      .fps(PROCESS_ENV.get("INPUT_VIDEO_FRAME_SAMPLING"))
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
