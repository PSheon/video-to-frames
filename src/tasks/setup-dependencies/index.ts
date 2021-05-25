import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import rimraf from "rimraf";

import { installFFMPEG } from "./helpers";

/* eslint max-statements: ["error", 25] */
/* eslint complexity: ["error", 15] */
export default async function (): Promise<void> {
  const spinner = ora("檢查相依套件中...").start();
  const baseDirName = global["baseDirName"];

  /* 刪除暫存文件 */
  rimraf.sync(path.resolve(baseDirName, "output", "stage-split/*.jpg"));
  rimraf.sync(path.resolve(baseDirName, "output", "stage-split/*.json"));
  rimraf.sync(path.resolve(baseDirName, "output", "stage-inference/*.jpg"));
  rimraf.sync(path.resolve(baseDirName, "output", "stage-inference/*.json"));

  /* FFMPEG */
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

  spinner.succeed(`${chalk.green("[相依套件]")} 已安裝`);
}
