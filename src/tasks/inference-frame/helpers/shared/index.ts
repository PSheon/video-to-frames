const getModelType = (modelName: string): string => {
  if (modelName.includes("blazepose")) {
    return "blazepose";
  }
  if (modelName.includes("efficientpose")) {
    return "efficientpose";
  }

  return "posenet";
};

const getEfficientPoseModelPath = (modelName: string): string => {
  return `file://src/model/efficientpose/${String(modelName).replace(
    "efficientpose-",
    "",
  )}/efficientpose.json`;
};

export { getModelType, getEfficientPoseModelPath };
