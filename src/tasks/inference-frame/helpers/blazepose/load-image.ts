/* TODO Migrate to ts */
import fs from "fs";
import path from "path";

const tf = require("@tensorflow/tfjs-node");

export default function (fileName) {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;

    const data = fs.readFileSync(
      path.resolve(baseDirName, "output", "stage-split", fileName),
    );
    const obj = tf.tidy(() => {
      const buffer = tf.node.decodeImage(data);
      const cast = buffer.cast("float32");
      const expand = cast.expandDims(0);

      return expand;
    });

    resolve(obj);
  });
}
