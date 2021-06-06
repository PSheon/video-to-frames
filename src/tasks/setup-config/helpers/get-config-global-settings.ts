import PROCESS_ENV from "config";

import chalk from "chalk";
import path from "path";
import FileType, { FileTypeResult } from "file-type";

import {
  IGetConfigGlobalSettingsInput,
  IGetConfigGlobalSettingsOutput,
} from "../../../types";

export default async function ({
  spinner,
}: IGetConfigGlobalSettingsInput): Promise<IGetConfigGlobalSettingsOutput> {
  const baseDirName = global["baseDirName"];

  /* check input are image or video */
  const { mime: fileMimeType } = (await FileType.fromFile(
    path.resolve(
      baseDirName,
      PROCESS_ENV.get("INPUT_FILEPATH"),
      PROCESS_ENV.get("INPUT_FILENAME"),
    ),
  )) as FileTypeResult;
  if (!fileMimeType.includes("image") && !fileMimeType.includes("video")) {
    spinner.fail(
      `請確認 ${chalk.yellow(
        PROCESS_ENV.get("INPUT_FILENAME"),
      )} 是正常的圖片或影片.`,
    );
    process.exit(1);
  }

  return {
    fileMimeType,
  };
}
