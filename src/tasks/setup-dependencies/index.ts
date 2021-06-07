import fs from "fs";
import path from "path";

import chalk from "chalk";
import ffmpeg from "fluent-ffmpeg";
import ora from "ora";

import { installFFMPEG } from "./helpers";

/* eslint max-statements: ["error", 25] */
/* eslint complexity: ["error", 15] */
export default async function (): Promise<void> {
  const spinner = ora("檢查相依套件中...").start();
  const baseDirName = global.baseDirName;

  /* 檢查 FFMPEG 存在 */
  if (!fs.existsSync(path.resolve(baseDirName, "ffmpeg"))) {
    fs.mkdirSync(path.resolve(baseDirName, "ffmpeg"));
  }
  if (!fs.existsSync(path.resolve(baseDirName, "ffmpeg", "ffmpeg"))) {
    spinner.text = `安裝 ${chalk.yellow("ffmpeg")} ...`;
    await installFFMPEG({ spinner, baseDirName });
  }
  if (!fs.existsSync(path.resolve(baseDirName, "ffmpeg", "ffprobe"))) {
    spinner.text = `安裝 ${chalk.yellow("ffprobe")} ...`;
    await installFFMPEG({ spinner, baseDirName });
  }

  ffmpeg.setFfmpegPath(
    path.resolve(baseDirName, path.resolve(baseDirName, "ffmpeg", "ffmpeg")),
  );
  ffmpeg.setFfprobePath(
    path.resolve(baseDirName, path.resolve(baseDirName, "ffmpeg", "ffprobe")),
  );

  spinner.succeed(`${chalk.green("[相依套件]")} 已安裝`);
}
