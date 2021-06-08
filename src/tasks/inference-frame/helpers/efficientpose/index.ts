/* TODO Migrate to ts */
import { readdir } from "fs/promises";
import path from "path";

import chalk from "chalk";

import inferencePose from "./inferencePose";

import { getEfficientPoseModelPath } from "../shared";

const tf = require("@tensorflow/tfjs-node");

export default function ({ spinner, modelName }): Promise<void> {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;

    const model = await tf.loadGraphModel(getEfficientPoseModelPath(modelName));
    const inputs: any[] = model.modelSignature.inputs;
    const inputSize = Object.values(inputs)[0].tensorShape.dim[2].size;

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
        model,
        inputSize,
        frameName,
      });

      spinner.text = `🔍 推理第 ${chalk.green(
        `${inferenceIndex + skipFrames} / ${frames.length}`,
      )} 張圖片，跳過 ${chalk.yellow(skipFrames)} 張，花費 ${chalk.green(
        inferenceTime,
      )} 毫秒，解構 ${chalk.green(processTime)} 毫秒`;
    }

    resolve();
  });
}
