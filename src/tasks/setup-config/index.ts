import PROCESS_ENV from "config";

import path from "path";

import chalk from "chalk";
import EventBus from "js-event-bus";
import moment from "moment";
import "moment-timezone";
import "moment/locale/zh-tw";
import ora from "ora";
import { TConfig } from "types";

import {
  checkConfig,
  getConfigGlobalSettings,
  validateConfig,
} from "./helpers";

export default async function (): Promise<void> {
  /* tslint:disable:no-console */
  console.log(`\n🧰 運行環境 > ${chalk.blue(process.env.NODE_ENV)}`);
  /* tslint:enable:no-console */

  const spinner = ora("檢查設定參數...").start();
  const baseDirName = path.join(__dirname, "../../../");

  /* Event Bus */
  const eventBus = new EventBus();

  /* Check all config correctly */
  validateConfig({ spinner, config: PROCESS_ENV.util.toObject() as TConfig });
  checkConfig({ spinner, baseDirName });
  const { inputMimeType } = await getConfigGlobalSettings({
    spinner,
    baseDirName,
  });

  /* Moment */
  moment.locale("zh-tw");
  moment.tz.setDefault("Asia/Taipei");

  /* Global */
  global.baseDirName = baseDirName;
  global.inputMimeType = inputMimeType;
  global.eventBus = eventBus;

  spinner.succeed(`${chalk.green("[環境設定]")} 格式正確`);
}
