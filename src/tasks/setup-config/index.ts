import PROCESS_ENV from "config";

import chalk from "chalk";
import path from "path";
import moment from "moment";
import ora from "ora";

import "moment-timezone";
import "moment/locale/zh-tw";

import {
  validateConfig,
  checkConfig,
  getConfigGlobalSettings,
} from "./helpers";

export default async function (): Promise<void> {
  console.log(`運行環境 > ${chalk.blue(process.env.NODE_ENV)}`);

  const spinner = ora("檢查設定參數...").start();

  /* Check all config correctly */
  validateConfig({ spinner, config: PROCESS_ENV.util.toObject() });
  checkConfig({ spinner });
  const { fileMimeType } = await getConfigGlobalSettings({ spinner });

  /* Moment */
  moment.locale("zh-tw");
  moment.tz.setDefault("Asia/Taipei");

  /* Global */
  global["baseDirName"] = path.join(__dirname, "../../../");
  global["fileMimeType"] = fileMimeType;

  spinner.succeed(`${chalk.green("[環境設定]")} 格式正確`);
}
