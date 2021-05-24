"use strict";

const PROCESS_ENV = require("config");

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");

module.exports = () =>
  new Promise((resolve, reject) => {
    const spinner = new ora("準備影片中...").start();
    const baseDirName = path.dirname(require.main.filename);

    console.log("baseDirName, ", baseDirName);

    if (
      !fs.existsSync(
        path.join(
          baseDirName,
          PROCESS_ENV.INPUT_VIDEO_PATH,
          PROCESS_ENV.INPUT_VIDEO_FILENAME,
        ),
      )
    ) {
      spinner.fail(
        `請確認 ${chalk.yellow(
          PROCESS_ENV.INPUT_VIDEO_FILENAME,
        )} 放在路徑 ${chalk.yellow(
          path.resolve(baseDirName, PROCESS_ENV.INPUT_VIDEO_PATH),
        )} 下.`,
      );
      process.exit(1);
    }

    spinner.succeed(`${chalk.green("[準備影片]")} 已完成`);
    resolve();
  });
