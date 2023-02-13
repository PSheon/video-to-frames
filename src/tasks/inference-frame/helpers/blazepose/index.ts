/* TODO Migrate to ts */
import { readdir } from "fs/promises";
import path from "path";

import inferencePose from "./inference-pose";

import {
  generateInferenceHintText,
  getBlazePoseModelPath,
} from "src/tasks/inference-frame/helpers/shared";

const tf = require("@tensorflow/tfjs-node");

export default function ({ spinner, modelName }): Promise<void> {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;

    const model = await tf.loadGraphModel(getBlazePoseModelPath(modelName));

    const frames = await readdir(
      path.resolve(baseDirName, "output", "stage-split"),
    );

    const inferencesTime: number[] = [];
    let skipFrames = 0;

    for (const [inferenceIndex, frameName] of frames.entries()) {
      if (!frameName.includes(".jpg")) {
        skipFrames++;
        continue;
      }

      const { inferenceTime, processTime } = await inferencePose({
        model,
        modelName,
        frameName,
      });

      inferencesTime.length === 100 && inferencesTime.shift();
      inferencesTime.push(inferenceTime);

      spinner.text = generateInferenceHintText(
        inferenceIndex,
        skipFrames,
        frames.length,
        inferencesTime,
        processTime,
      );
    }

    resolve();
  });
}
