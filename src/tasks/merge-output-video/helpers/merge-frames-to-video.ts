import PROCESS_ENV from "config";

import path from "path";

import chalk from "chalk";
import ffmpeg from "fluent-ffmpeg";
import { IMergeFramesToVideoInput } from "src/types";

export default function ({ spinner }: IMergeFramesToVideoInput): Promise<void> {
  return new Promise((resolve) => {
    const baseDirName = global.baseDirName;

    ffmpeg(
      path.resolve(
        "output",
        "stage-inference",
        `${PROCESS_ENV.get("SPLIT_FRAME_IMAGE_PREFIX")}_%05d.jpg`,
      ),
    )
      .on("error", (err) => {
        spinner.fail(`${chalk.red("[階段四]")} 生成影片失敗: ${err.message}`);
        process.exit(1);
      })
      .on("end", () => {
        resolve();
      })
      .inputFPS(PROCESS_ENV.get("INPUT_VIDEO_FRAME_SAMPLING"))
      .output(path.resolve(baseDirName, "output", "stage-merge", `merge.mp4`))
      .run();
  });
}
