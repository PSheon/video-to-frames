import { readFile } from "fs/promises";
import path from "path";

import preparingInput from "../src/tasks/preparing-input";
import setupConfig from "../src/tasks/setup-config";
import setupDependencies from "../src/tasks/setup-dependencies";
import "../src/types";

beforeEach(async () => {
  await setupConfig();
  await setupDependencies();

  await preparingInput();
});

test(`should generate metadata.json.`, async () => {
  const baseDirName = global.baseDirName;

  const META_DATA = await readFile(
    path.resolve(baseDirName, "output", "stage-split", "frame_metadata.json"),
  );

  const metadata = JSON.parse(META_DATA.toString());

  expect(typeof metadata.duration).toBe("number");
  expect(typeof metadata.width).toBe("number");
  expect(typeof metadata.height).toBe("number");
});
