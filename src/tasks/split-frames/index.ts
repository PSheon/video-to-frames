import PROCESS_ENV from "config";

import fs from "fs";
import ora from "ora";
import path from "path";
import chalk from "chalk";
import ffmpeg from "fluent-ffmpeg";

export default function (): Promise<void> {
  return new Promise((resolve) => {
    const spinner = ora("分割影片中...").start();
    const baseDirName = global["baseDirName"];

    console.log("baseDirName, ", baseDirName);

    ffmpeg.setFfmpegPath(
      path.resolve(baseDirName, path.resolve(baseDirName, "ffmpeg", "ffmpeg")),
    );
    ffmpeg.setFfprobePath(
      path.resolve(baseDirName, path.resolve(baseDirName, "ffmpeg", "ffprobe")),
    );

    ffmpeg(
      path.resolve(
        baseDirName,
        PROCESS_ENV.get("INPUT_VIDEO_PATH"),
        PROCESS_ENV.get("INPUT_VIDEO_FILENAME"),
      ),
    )
      .on("codecData", (data) => {
        spinner.text = `Input is ${data.audio} audio with ${data.video} video"`;
      })
      .on("error", (err) => {
        spinner.fail(`${chalk.red("[階段一]")} 影片分割失敗: ${err.message}`);
        process.exit(1);
      })
      .on("end", () => {
        spinner.succeed(`${chalk.green("[階段一]")} 影片分割完成！`);
        resolve();
      })
      .fps(PROCESS_ENV.get("INPUT_VIDEO_FRAME_SAMPLING"))
      .save(
        path.resolve(
          baseDirName,
          "output",
          "stage-split",
          `${PROCESS_ENV.get("SPLIT_FRAME_IMAGE_PREFIX")}_%05d.jpg`,
        ),
      )
      .ffprobe(function (err, metadata) {
        if (err) {
          spinner.fail(
            `${chalk.red("[階段一]")} 無法取得影片資訊: ${err.message}`,
          );
          process.exit(1);
        }
        const videoMetadata = metadata.streams.find(
          (item) => item.codec_type == "video",
        );

        const META_DATA = {
          duration: videoMetadata.duration,
          width: videoMetadata.width,
          height: videoMetadata.height,
        };

        fs.writeFileSync(
          path.resolve(
            baseDirName,
            "output",
            "stage-split",
            "frame_metadata.json",
          ),
          JSON.stringify(META_DATA),
        );
      });
  });
}
