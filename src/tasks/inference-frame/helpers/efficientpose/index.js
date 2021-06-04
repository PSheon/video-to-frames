const { readdir } = require("fs/promises");
const chalk = require("chalk");
const path = require("path");

const tf = require("@tensorflow/tfjs-node");

const inferencePose = require("./inferencePose");
const { getEfficientPoseModelPath } = require("../shared");

module.exports = ({ spinner, modelName }) =>
  new Promise(async (resolve) => {
    const baseDirName = global["baseDirName"];

    const model = await tf.loadGraphModel(getEfficientPoseModelPath(modelName));
    const inputSize = Object.values(model.modelSignature["inputs"])[0]
      .tensorShape.dim[2].size;

    const frames = await readdir(
      path.resolve(baseDirName, "output", "stage-split"),
    );

    let skipFrames = 0;

    for (const [inferenceIndex, frame] of frames.entries()) {
      if (!frame.includes(".jpg")) {
        skipFrames++;
        continue;
      }

      const { inferenceTime, processTime } = await inferencePose({
        model,
        inputSize,
        frame,
      });

      spinner.text = `🔍 推理第 ${chalk.green(
        `${inferenceIndex + skipFrames} / ${frames.length}`,
      )} 張圖片，跳過 ${chalk.yellow(skipFrames)} 張，花費 ${chalk.green(
        inferenceTime,
      )} 毫秒，解構 ${chalk.green(processTime)} 毫秒`;
    }

    resolve();
  });
