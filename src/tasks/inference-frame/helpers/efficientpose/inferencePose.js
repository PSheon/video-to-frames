"use strict";

const { writeFile } = require("fs/promises");
const path = require("path");

const processResults = require("./process-results");
const loadImage = require("./load-image");
const saveImage = require("./save-image");

module.exports = ({ model, inputSize, frame }) =>
  new Promise(async (resolve) => {
    const baseDirName = path.dirname(require.main.filename);
    const img = await loadImage(frame, inputSize);

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
