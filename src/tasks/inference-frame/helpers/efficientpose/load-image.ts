/* TODO Migrate to ts */
import fs from "fs";
import path from "path";

const tf = require("@tensorflow/tfjs-node");

export default function (frameName, inputSize) {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;

    const data = fs.readFileSync(
      path.resolve(baseDirName, "output", "stage-split", frameName),
    );
    const obj = tf.tidy(() => {
      const buffer = tf.node.decodeImage(data);
      const expand = buffer.expandDims(0);
      const cast = expand.cast("float32");
      const pad = expand;
      const resize = tf.image.resizeBilinear(cast, [inputSize, inputSize]);
      const normalize = resize.div(127.5).sub(1);
      const tensor = normalize;
      const img = {
        frameName,
        tensor,
        inputShape: buffer?.shape,
        paddedShape: pad?.shape,
        modelShape: tensor?.shape,
        size: buffer?.size,
      };
      return img;
    });

    resolve(obj);
  });
}
