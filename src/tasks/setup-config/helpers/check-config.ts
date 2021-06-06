import PROCESS_ENV from "config";

import fs from "fs";
import path from "path";
import chalk from "chalk";
import rimraf from "rimraf";

export default function ({ spinner }) {
  const baseDirName = global["baseDirName"];

  /* 刪除暫存文件 */
  if (Boolean(PROCESS_ENV.get("DELETE_PREVIOUS_OUTPUT"))) {
    rimraf.sync(path.resolve(baseDirName, "output", "stage-split/*.jpg"));
    rimraf.sync(path.resolve(baseDirName, "output", "stage-split/*.json"));
    rimraf.sync(path.resolve(baseDirName, "output", "stage-inference/*.jpg"));
    rimraf.sync(path.resolve(baseDirName, "output", "stage-inference/*.json"));
  }

  /* 確認輸入文件存在 */
  if (
    !fs.existsSync(
      path.resolve(
        baseDirName,
        PROCESS_ENV.get("INPUT_FILEPATH"),
        PROCESS_ENV.get("INPUT_FILENAME"),
      ),
    )
  ) {
    spinner.fail(
      `請確認 ${chalk.yellow(
        PROCESS_ENV.get("INPUT_FILENAME"),
      )} 放在路徑 ${chalk.yellow(
        path.resolve(baseDirName, PROCESS_ENV.get("INPUT_FILEPATH")),
      )} 下.`,
    );
    process.exit(1);
  }
}
