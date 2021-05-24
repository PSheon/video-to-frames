"use strict";

const fs = require("fs");
const path = require("path");

const chalk = require("chalk");
const ora = require("ora");
const rimraf = require("rimraf");

const { installFFMPEG } = require("./helpers");

/* eslint max-statements: ["error", 25] */
/* eslint complexity: ["error", 15] */
module.exports = async () => {
  const spinner = new ora("檢查相依套件中...").start();
  const baseDirName = path.dirname(require.main.filename);

  /* 刪除暫存文件 */
  rimraf.sync(path.join(baseDirName, "output", "stage-split/*.jpg"));
  rimraf.sync(path.join(baseDirName, "output", "stage-split/*.json"));
  rimraf.sync(path.join(baseDirName, "output", "stage-inference/*.jpg"));
  rimraf.sync(path.join(baseDirName, "output", "stage-inference/*.json"));

  /* FFMPEG */
  if (!fs.existsSync(path.join(baseDirName, "ffmpeg"))) {
    fs.mkdirSync(path.join(baseDirName, "ffmpeg"));
  }
  if (!fs.existsSync(path.join(baseDirName, "ffmpeg", "ffmpeg"))) {
    spinner.text = `安裝 ${chalk.yellow("ffmpeg")} ...`;
    await installFFMPEG({ baseDirName, spinner });
  }
  if (!fs.existsSync(path.join(baseDirName, "ffmpeg", "ffprobe"))) {
    spinner.text = `安裝 ${chalk.yellow("ffprobe")} ...`;
    await installFFMPEG({ baseDirName, spinner });
  }

  spinner.succeed(`${chalk.green("[相依套件]")} 已安裝`);
};
