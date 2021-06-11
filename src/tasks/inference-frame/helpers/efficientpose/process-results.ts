/* TODO Migrate to ts */
import PROCESS_ENV from "config";

import { EFFICIENT_POSE_BODY_PARTS } from "constant";

const tf = require("@tensorflow/tfjs-node");

const max2d = (inputs) => {
  const [width, height] = inputs.shape;
  return tf.tidy(() => {
    // modulus op implemented in tf
    const mod = (a, b) =>
      tf.sub(
        a,
        tf.mul(tf.div(a, tf.scalar(b, "int32")), tf.scalar(b, "int32")),
      );
    // combine all data
    const reshaped = tf.reshape(inputs, [height * width]);
    // get highest score
    const score = tf.max(reshaped, 0).dataSync()[0];
    if (
      score > Number(PROCESS_ENV.get("EFFICIENTPOSE_MODEL_MIN_SCORE_THRESHOLD"))
    ) {
      // skip coordinate calculation is score is too low
      const coords = tf.argMax(reshaped, 0);
      const x = mod(coords, width).dataSync()[0];
      const y = tf.div(coords, tf.scalar(width, "int32")).dataSync()[0];
      return [x, y, score];
    }
    return [0, 0, score];
  });
};

export default function (res, img) {
  return new Promise((resolve) => {
    const squeeze = res.squeeze();
    tf.dispose(res);
    // body parts are basically just a stack of 2d tensors
    const stack = squeeze.unstack(2);
    tf.dispose(squeeze);
    const parts: any = [];
    // process each unstacked tensor as a separate body part
    for (let id = 0; id < stack.length; id++) {
      // actual processing to get coordinates and score
      const [x, y, score] = max2d(stack[id]);
      const [xRaw, yRaw] = [
        // x, y normalized to 0..1
        x / img.modelShape[2],
        y / img.modelShape[1],
      ];
      if (
        score >
        Number(PROCESS_ENV.get("EFFICIENTPOSE_MODEL_MIN_SCORE_THRESHOLD"))
      ) {
        parts.push({
          id,
          score,
          label: EFFICIENT_POSE_BODY_PARTS[id],
          xRaw,
          yRaw,
          x: Math.round(img.inputShape[1] * xRaw), // x normalized to input image size
          y: Math.round(img.inputShape[0] * yRaw), // y normalized to input image size
        });
      }
    }
    stack.forEach((a) => tf.dispose(a));

    resolve(parts);
  });
}
