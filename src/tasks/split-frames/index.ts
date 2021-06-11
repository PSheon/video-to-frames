import ora from "ora";

import { splitImageToFrame, splitVideoToFrames } from "./helpers";

export default function (): Promise<void> {
  return new Promise(async (resolve) => {
    const spinner = ora("分割文件中...").start();
    const inputMimeType = global.inputMimeType;

    if (inputMimeType.includes("image")) {
      await splitImageToFrame({ spinner });
    }

    if (inputMimeType.includes("video")) {
      await splitVideoToFrames({ spinner });
    }

    resolve();
  });
}
