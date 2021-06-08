/* TODO Migrate to ts */
import { writeFile } from "fs/promises";
import path from "path";

import {
  IEfficientPoseInferenceInput,
  IEfficientPoseInferenceOutput,
} from "types";

import loadImage from "./load-image";
import processResults from "./process-results";
import saveImage from "./save-image";

export default function ({
  model,
  inputSize,
  frameName,
}: IEfficientPoseInferenceInput): Promise<IEfficientPoseInferenceOutput> {
  return new Promise(async (resolve) => {
    const baseDirName = global.baseDirName;
    const img: any = await loadImage(frameName, inputSize);

    const t0 = process.hrtime.bigint();
    const res = model.execute(img.tensor);
    const t1 = process.hrtime.bigint();
    const inferenceTime = Math.round(
      parseInt((t1 - t0).toString(), 10) / 1000 / 1000,
    );

    const results = await processResults(res, img);

    const t2 = process.hrtime.bigint();
    const processTime = Math.round(
      parseInt((t2 - t1).toString(), 10) / 1000 / 1000,
    );

    await saveImage(results, img);

    await writeFile(
      path.resolve(
        baseDirName,
        "output",
        "stage-inference",
        frameName.replace(".jpg", ".json"),
      ),
      JSON.stringify(results),
    );

    resolve({ inferenceTime, processTime });
  });
}
