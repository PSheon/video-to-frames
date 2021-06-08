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
  getBlazePoseModelPath,
  getEfficientPoseModelPath,
  getMoveNetModelPath,
};
