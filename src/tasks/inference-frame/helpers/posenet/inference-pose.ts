import PROCESS_ENV from "config";

import { createWriteStream } from "fs";
import { writeFile } from "fs/promises";
import path from "path";

import { createCanvas, Image } from "canvas";
import { IPoseNetInferenceInput, IPoseNetInferenceOutput } from "types";

const tf = require("@tensorflow/tfjs-node");

export default function ({
  model,
  frameName,
}: IPoseNetInferenceInput): Promise<IPoseNetInferenceOutput> {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;
    const bodyObj = {};
    const img = new Image();

    img.src = `${baseDirName}/output/stage-split/${frameName}`;

    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    await ctx.drawImage(img, 0, 0);
    // @ts-ignore-start
    const input = await tf.browser.fromPixels(canvas);
    // @ts-ignore-end

    const t0 = process.hrtime.bigint();
    const pose = await model.estimateSinglePose(input, {
      flipHorizontal: PROCESS_ENV.get("POSENET_INFERENCE_FLIP_HORIZONTAL"),
    });
    const t1 = process.hrtime.bigint();
    const inferenceTime = Math.round(
      parseInt((t1 - t0).toString(), 10) / 1000 / 1000,
    );

    for (const keypoint of pose.keypoints) {
      ctx.beginPath();
      ctx.arc(
        Math.round(keypoint.position.x),
        Math.round(keypoint.position.y),
        5,
        0,
        2 * Math.PI,
      );
      ctx.fillStyle = "yellow";
      ctx.fill();

      Object.assign(bodyObj, {
        [keypoint.part]: [
          Math.round(keypoint.position.x),
          Math.round(keypoint.position.y),
        ],
      });
    }

    const t2 = process.hrtime.bigint();
    const processTime = Math.round(
      parseInt((t2 - t1).toString(), 10) / 1000 / 1000,
    );

    const out = createWriteStream(
      path.join(baseDirName, "output", "stage-inference", frameName),
    );
    const stream = canvas.createJPEGStream();
    stream.pipe(out);

    await writeFile(
      path.resolve(
        baseDirName,
        "output",
        "stage-inference",
        frameName.replace(".jpg", ".json"),
      ),
      JSON.stringify(bodyObj),
    );

    resolve({ inferenceTime, processTime });
  });
}
