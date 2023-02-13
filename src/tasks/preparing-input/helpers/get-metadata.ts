import PROCESS_ENV from "config";

import fs from "fs";
import path from "path";

import chalk from "chalk";
import ffmpeg, { FfprobeStream } from "fluent-ffmpeg";
import { IGetMetadataInput } from "src/types";

export default function ({ spinner }: IGetMetadataInput): Promise<void> {
  return new Promise((resolve) => {
    const baseDirName = global.baseDirName;
    ffmpeg(
      path.resolve(
        baseDirName,
        PROCESS_ENV.get("INPUT_FILEPATH"),
        PROCESS_ENV.get("INPUT_FILENAME"),
      ),
    ).ffprobe((err, metadata) => {
      if (err) {
        spinner.fail(
          `${chalk.red("[階段一]")} 無法取得文件資訊: ${err.message}`,
        );
        process.exit(1);
      }

      const META_DATA = metadata.streams.find(
        (item) => item.codec_type === "video",
      ) as FfprobeStream;

      fs.writeFileSync(
        path.resolve(
          baseDirName,
          "output",
          "stage-split",
          "frame_metadata.json",
        ),
        JSON.stringify({
          duration: META_DATA.duration,
          width: META_DATA.width,
          height: META_DATA.height,
        }),
      );

      resolve();
    });
  });
}
