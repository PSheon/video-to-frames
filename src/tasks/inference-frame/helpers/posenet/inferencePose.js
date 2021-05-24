"use strict";

const PROCESS_ENV = require("config");

const fs = require("fs");
const path = require("path");
const { writeFile } = require("fs/promises");
const tf = require("@tensorflow/tfjs-node");
const posenet = require("@tensorflow-models/posenet");
const { createCanvas, Image } = require("canvas");

module.exports = ({ frame }) =>
  new Promise(async (resolve) => {
    const net = await posenet.load();
    const baseDirName = path.dirname(require.main.filename);
    const bodyObj = {};
    const img = new Image();
    img.src = `${baseDirName}/output/stage-split/${frame}`;
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    await ctx.drawImage(img, 0, 0);
    const input = await tf.browser.fromPixels(canvas);

    const t0 = process.hrtime.bigint();
    const pose = await net.estimateSinglePose(
      input,
      PROCESS_ENV.POSENE,
      PROCESS_ENV.POS,
      PROCESS_ENV.POSENET_INFERENCE_OUTPUT_STRIDE,
    );
    const t1 = process.hrtime.bigint();
    const inferenceTime = Math.round(
      parseInt((t1 - t0).toString()) / 1000 / 1000,
    );

    for (const keypoint of pose.keypoints) {
      ctx.beginPath();
      ctx.arc(
        Math.round(parseInt(keypoint.position.x, 10)),
        Math.round(parseInt(keypoint.position.y, 10)),
        5,
        0,
        2 * Math.PI,
      );
      ctx.fillStyle = "yellow";
      ctx.fill();

      Object.assign(bodyObj, {
        [keypoint.part]: [
          Math.round(parseInt(keypoint.position.x, 10)),
          Math.round(parseInt(keypoint.position.y, 10)),
        ],
      });
    }
    const t2 = process.hrtime.bigint();
    const processTime = Math.round(
      parseInt((t2 - t1).toString()) / 1000 / 1000,
    );

    const out = fs.createWriteStream(
      path.join(baseDirName, "output", "stage-inference", frame),
    );
    const stream = canvas.createJPEGStream();
    stream.pipe(out);

    await writeFile(
      path.resolve(
        baseDirName,
        "output",
        "stage-inference",
        frame.replace(".jpg", ".json"),
      ),
      JSON.stringify(bodyObj),
    );

    resolve({ inferenceTime, processTime });
  });
