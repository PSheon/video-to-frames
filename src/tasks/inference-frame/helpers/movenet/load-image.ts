/* TODO Migrate to ts */
import fs from "fs";
import path from "path";

const tf = require("@tensorflow/tfjs-node");

export default function (fileName, inputSize) {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;

    const data = fs.readFileSync(
      path.resolve(baseDirName, "output", "stage-split", fileName),
    );
    const obj = tf.tidy(() => {
      const buffer = tf.node.decodeImage(data);
      const expand = buffer.expandDims(0);

      const resize = tf.image.resizeBilinear(expand, [inputSize, inputSize]);
      const cast = tf.cast(resize, "int32");
      const tensor = cast;
      const img = {
        fileName,
        tensor,
        inputShape: buffer?.shape,
        modelShape: tensor?.shape,
        size: buffer?.size,
      };
      return img;
    });

    resolve(obj);
  });
}
