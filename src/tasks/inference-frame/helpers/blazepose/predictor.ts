import PROCESS_ENV from "config";

const tf = require("@tensorflow/tfjs-node");

import {
  BLAZE_POSE_FULL_BODY_PARTS,
  BLAZE_POSE_UPPER_BODY_PARTS,
} from "constant";

// each points has x, y, z, visibility, presence
const depth = 5;

const runFull = async (model, image): Promise<any> => {
  const normalize = image.div(127.5).sub(1);
  const resize = tf.image.resizeBilinear(normalize, [256, 256]);
  normalize.dispose();
  const resT = await model.predict(resize);
  resize.dispose();

  // order of output tensors may change between models, full has 195 and upper has 155 items
  const points = resT.find((t) => t.size === 195).dataSync();
  resT.forEach((t) => t.dispose());
  let totalScore = 0;

  const allKeypoints: any = [];
  for (let i = 0; i < points.length / depth; i++) {
    const visibility =
      (100 - Math.trunc(100 / (1 + Math.exp(points[depth * i + 3])))) / 100; // reverse sigmoid value
    const presence =
      (100 - Math.trunc(100 / (1 + Math.exp(points[depth * i + 4])))) / 100; // reverse sigmoid value
    totalScore += Math.min(visibility, presence);
    allKeypoints.push({
      id: i,
      part: BLAZE_POSE_FULL_BODY_PARTS[i],
      position: {
        x: Math.trunc((image.shape[2] * points[depth * i + 0]) / 256), // return normalized x value istead of 0..255
        y: Math.trunc((image.shape[1] * points[depth * i + 1]) / 256), // return normalized y value istead of 0..255
        z: Math.trunc(points[depth * i + 2]) + 0, // fix negative zero
      },
      score: Math.min(visibility, presence),
    });
  }

  const avgScore = totalScore / allKeypoints.length;
  const keypoints = allKeypoints.filter(
    (a) =>
      a.score > Number(PROCESS_ENV.get("BLAZEPOSE_MODEL_MIN_SCORE_THRESHOLD")),
  );
  const visibleScore = totalScore / keypoints.length;
  return {
    keypoints,
    visibleParts: keypoints.length,
    visibleScore,
    missingParts: allKeypoints.length - keypoints.length,
    avgScore,
  };
};

const runUpper = async (model, image): Promise<any> => {
  const normalize = image.div(127.5).sub(1);
  const resize = tf.image.resizeBilinear(normalize, [256, 256]);
  normalize.dispose();
  const resT = await model.predict(resize); // blazepose-full
  resize.dispose();

  // order of output tensors may change between models, full has 195 and upper has 155 items
  const points = resT.find((t) => t.size === 155).dataSync();
  resT.forEach((t) => t.dispose());
  let totalScore = 0;

  const allKeypoints: any = [];
  for (let i = 0; i < points.length / depth; i++) {
    const visibility =
      (100 - Math.trunc(100 / (1 + Math.exp(points[depth * i + 3])))) / 100; // reverse sigmoid value
    const presence =
      (100 - Math.trunc(100 / (1 + Math.exp(points[depth * i + 4])))) / 100; // reverse sigmoid value
    totalScore += Math.min(visibility, presence);
    allKeypoints.push({
      id: i,
      part: BLAZE_POSE_UPPER_BODY_PARTS[i],
      position: {
        x: Math.trunc((image.shape[2] * points[depth * i + 0]) / 256), // return normalized x value istead of 0..255
        y: Math.trunc((image.shape[1] * points[depth * i + 1]) / 256), // return normalized y value istead of 0..255
        z: Math.trunc(points[depth * i + 2]) + 0, // fix negative zero
      },
      score: Math.min(visibility, presence),
    });
  }

  const avgScore = totalScore / allKeypoints.length;
  const keypoints = allKeypoints.filter(
    (a) =>
      a.score > Number(PROCESS_ENV.get("BLAZEPOSE_MODEL_MIN_SCORE_THRESHOLD")),
  );
  const visibleScore = totalScore / keypoints.length;
  return {
    keypoints,
    visibleParts: keypoints.length,
    visibleScore,
    missingParts: allKeypoints.length - keypoints.length,
    avgScore,
  };
};

export default function (model, image, modelName: "full" | "upper") {
  switch (modelName) {
    case "full":
      return runFull(model, image);
    default:
    case "upper":
      return runUpper(model, image);
  }
}
