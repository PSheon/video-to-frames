const fs = require("fs");
const path = require("path");
const tf = require("@tensorflow/tfjs-node");

module.exports = (fileName, inputSize) =>
  new Promise(async (resolve) => {
    const baseDirName = global["baseDirName"];

    const data = fs.readFileSync(
      path.resolve(baseDirName, "output", "stage-split", fileName),
    );
    const obj = tf.tidy(() => {
      const buffer = tf.node.decodeImage(data);
      const expand = buffer.expandDims(0);
      const cast = expand.cast("float32");
      // const pad = padImage(cast);
      const pad = expand;
      // @ts-ignore
      const resize = tf.image.resizeBilinear(cast, [inputSize, inputSize]);
      const normalize = resize.div(127.5).sub(1);
      const tensor = normalize;
      const img = {
        // fileName: path.resolve(baseDirName, 'output', 'stage-split', fileName),
        fileName,
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
