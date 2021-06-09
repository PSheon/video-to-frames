import { readdir } from "fs/promises";
import path from "path";

import inferencePose from "./inference-pose";

import { generateInferenceHintText } from "../shared";

export default function ({ spinner }): Promise<void> {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;
    const frames = await readdir(
      path.resolve(baseDirName, "output", "stage-split"),
    );

    let skipFrames = 0;

    for (const [inferenceIndex, frameName] of frames.entries()) {
      if (!frameName.includes(".jpg")) {
        skipFrames++;
        continue;
      }

      const { inferenceTime, processTime } = await inferencePose({
        frameName,
      });

      spinner.text = generateInferenceHintText(
        inferenceIndex,
        skipFrames,
        frames.length,
        inferenceTime,
        processTime,
      );
    }

    resolve();
  });
}
