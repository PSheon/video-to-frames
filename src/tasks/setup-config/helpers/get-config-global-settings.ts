import PROCESS_ENV from "config";

import path from "path";

import chalk from "chalk";
import FileType, { FileTypeResult } from "file-type";
import {
  IGetConfigGlobalSettingsInput,
  IGetConfigGlobalSettingsOutput,
} from "types";

export default async function ({
  spinner,
  baseDirName,
}: IGetConfigGlobalSettingsInput): Promise<IGetConfigGlobalSettingsOutput> {
  /* check input are image or video */
  const { mime: inputMimeType } = (await FileType.fromFile(
    path.resolve(
      baseDirName,
      PROCESS_ENV.get("INPUT_FILEPATH"),
      PROCESS_ENV.get("INPUT_FILENAME"),
    ),
  )) as FileTypeResult;
  if (!inputMimeType.includes("image") && !inputMimeType.includes("video")) {
    spinner.fail(
      `請確認 ${chalk.yellow(
        PROCESS_ENV.get("INPUT_FILENAME"),
      )} 是正常的圖片或影片.`,
    );
    process.exit(1);
  }

  return {
    inputMimeType,
  };
}
