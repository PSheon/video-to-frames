/* TODO Migrate to ts */
import { writeFile } from "fs/promises";
import path from "path";

import { IBlazePoseInferenceInput, IBlazePoseInferenceOutput } from "src/types";

const tf = require("@tensorflow/tfjs-node");

import loadImage from "./load-image";
import predictor from "./predictor";
import saveImage from "./save-image";

const getBlazePoseModelType = (modelName: string) =>
  modelName.replace("blazepose-", "") as "full" | "upper";

export default function ({
  model,
  modelName,
  frameName,
}: IBlazePoseInferenceInput): Promise<IBlazePoseInferenceOutput> {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;
    const img: any = await loadImage(frameName);

    const t0 = process.hrtime.bigint();
    const res = await predictor(model, img, getBlazePoseModelType(modelName));
    tf.dispose(img);
    const t1 = process.hrtime.bigint();
    const inferenceTime = Math.round(
      parseInt((t1 - t0).toString(), 10) / 1000 / 1000,
    );

    const t2 = process.hrtime.bigint();
    const processTime = Math.round(
      parseInt((t2 - t1).toString(), 10) / 1000 / 1000,
    );

    await saveImage(res, frameName);

    await writeFile(
      path.resolve(
        baseDirName,
        "output",
        "stage-inference",
        frameName.replace(".jpg", ".json"),
      ),
      JSON.stringify(res),
    );

    resolve({ inferenceTime, processTime });
  });
}
