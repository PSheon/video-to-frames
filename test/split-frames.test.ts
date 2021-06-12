import { readdir } from "fs/promises";
import path from "path";

import preparingInput from "../src/tasks/preparing-input";
import setupConfig from "../src/tasks/setup-config";
import setupDependencies from "../src/tasks/setup-dependencies";
import splitFrames from "../src/tasks/split-frames";
import "../src/types";

beforeEach(async () => {
  await setupConfig();
  await setupDependencies();

  await preparingInput();

  await splitFrames();
});

test(`should split video to 640x640 frames.`, async () => {
  const baseDirName = global.baseDirName;

  const STAGE_SPLIT = await readdir(
    path.resolve(baseDirName, "output", "stage-split"),
  );

  for (const fileName in STAGE_SPLIT) {
    if (fileName.includes(".jpg")) {
      const img = new Image();

      img.src = `${baseDirName}/output/stage-split/${fileName}`;

      img.onload = () => {
        expect(img.width).toBe(640);
        expect(img.height).toBe(640);
      };

      return;
    }
  }
});
