/* TODO Migrate to ts */
import { writeFile } from "fs/promises";
import path from "path";

import processResults from "./process-results";
import loadImage from "./load-image";
import saveImage from "./save-image";

import {
  IEfficientPoseInferenceInput,
  IEfficientPoseInferenceOutput,
} from "../../../../types";

export default function ({
  model,
  inputSize,
  frame,
}: IEfficientPoseInferenceInput): Promise<IEfficientPoseInferenceOutput> {
  return new Promise(async (resolve) => {
    const baseDirName = global["baseDirName"];
    const img: any = await loadImage(frame, inputSize);

    const t0 = process.hrtime.bigint();
    const res = model.execute(img.tensor);
    const t1 = process.hrtime.bigint();
    const inferenceTime = Math.round(
      parseInt((t1 - t0).toString()) / 1000 / 1000,
    );

    const results = await processResults(res, img);

    const t2 = process.hrtime.bigint();
    const processTime = Math.round(
      parseInt((t2 - t1).toString()) / 1000 / 1000,
    );

    await saveImage(results, img);

    await writeFile(
      path.resolve(
        baseDirName,
        "output",
        "stage-inference",
        frame.replace(".jpg", ".json"),
      ),
      JSON.stringify(results),
    );

    resolve({ inferenceTime, processTime });
  });
}
