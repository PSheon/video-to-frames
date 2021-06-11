import path from "path";

import chalk from "chalk";
import ffbinaries from "ffbinaries";
import { IInstallFFMPEGInput } from "types";

export default ({ spinner, baseDirName }: IInstallFFMPEGInput): Promise<void> =>
  new Promise((resolve) => {
    const platform = ffbinaries.detectPlatform();
    ffbinaries.downloadBinaries(
      ["ffmpeg", "ffprobe"],
      {
        platform,
        quiet: true,
        destination: path.resolve(baseDirName, "ffmpeg"),
      },
      (err) => {
        if (err) {
          spinner.fail(`${chalk.red("[文件路徑]")} FFMPEG 安裝失敗: ${err}`);
          process.exit(1);
        }

        spinner.text = `${chalk.yellow("FFMPEG")} 安裝成功`;
        resolve();
      },
    );
  });
