import chalk from "chalk";

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
  inferenceTime: number,
  processTime: number,
) =>
  ` 推理第 ${chalk.green(
    `${inferenceIndex + skipFrames} / ${totalFrames}`,
  )} 張圖片，跳過 ${chalk.yellow(skipFrames)} 張，花費 ${chalk.green(
    inferenceTime,
  )} 毫秒，解構 ${chalk.green(processTime)} 毫秒\n⏰ 預估 ${chalk.green(
    Math.round(
      ((totalFrames - skipFrames - inferenceIndex + 1) * inferenceTime) / 1000,
    ),
  )} 秒後完成`;

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
