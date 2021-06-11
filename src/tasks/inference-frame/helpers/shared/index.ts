import chalk from "chalk";
import { KalmanFilter } from "kalman-filter";

const getModelType = (modelName: string): string => {
  if (modelName.includes("blazepose")) {
    return "blazepose";
  }
  if (modelName.includes("efficientpose")) {
    return "efficientpose";
  }
  if (modelName.includes("movenet")) {
    return "movenet";
  }

  return "posenet";
};

const generateInferenceHintText = (
  inferenceIndex: number,
  skipFrames: number,
  totalFrames: number,
  inferencesTime: number[],
  processTime: number,
) => {
  const kFilter = new KalmanFilter();

  const filteredInferenceTimeSeries = kFilter
    .filterAll(inferencesTime)
    .map((item) => Math.round(item[0]));
  const estimatedTimeLeft =
    Math.round(
      ((totalFrames - skipFrames - inferenceIndex + 1) *
        filteredInferenceTimeSeries.reduce((acc, cur) => acc + cur, 0)) /
        filteredInferenceTimeSeries.length /
        1000,
    ) + 1;

  return ` 推理第 ${chalk.green(
    `${inferenceIndex + skipFrames} / ${totalFrames}`,
  )} 張圖片，跳過 ${chalk.yellow(skipFrames)} 張，花費 ${chalk.green(
    inferencesTime[inferencesTime.length - 1],
  )} 毫秒，解構 ${chalk.green(processTime)} 毫秒\n⏰ 預估 ${chalk.green(
    estimatedTimeLeft,
  )} 秒後完成`;
};

const getBlazePoseModelPath = (modelName: string): string => {
  return `file://src/model/blazepose/${String(modelName).replace(
    "blazepose-",
    "",
  )}/blazepose.json`;
};

const getEfficientPoseModelPath = (modelName: string): string => {
  return `file://src/model/efficientpose/${String(modelName).replace(
    "efficientpose-",
    "",
  )}/efficientpose.json`;
};

const getMoveNetModelPath = (modelName: string): string => {
  return `file://src/model/movenet/${String(modelName).replace(
    "movenet-",
    "",
  )}/movenet.json`;
};

export {
  getModelType,
  generateInferenceHintText,
  getBlazePoseModelPath,
  getEfficientPoseModelPath,
  getMoveNetModelPath,
};
