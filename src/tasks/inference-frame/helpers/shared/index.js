const getModelType = (modelName) => {
  if (modelName.includes("blazepose")) {
    return "blazepose";
  }
  if (modelName.includes("efficientpose")) {
    return "efficientpose";
  }

  return "posenet";
};

const getEfficientPoseModelPath = (modelName) => {
  return `file://src/model/efficientpose/${String(modelName).replace(
    "efficientpose-",
    "",
  )}/efficientpose.json`;
};

module.exports = {
  getModelType,
  getEfficientPoseModelPath,
};
