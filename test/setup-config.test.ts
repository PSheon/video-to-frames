import { readdir } from "fs/promises";
import path from "path";

import setupConfig from "../src/tasks/setup-config";
import "../src/types";

beforeEach(async () => {
  await setupConfig();
});

test(`should has global 'baseDirName' string.`, () => {
  const baseDirName = global.baseDirName;

  expect(typeof baseDirName).toBe("string");
});

test(`should has global 'inputMimeType' string.`, () => {
  const inputMimeType = global.inputMimeType;

  expect(
    inputMimeType.includes("video") || inputMimeType.includes("image"),
  ).toBeTruthy();
});

test(`should has global 'eventBus' store.`, () => {
  const eventBus = global.eventBus;

  expect(eventBus.on).toBeDefined();
  expect(eventBus.emit).toBeDefined();
});

test(`folder output should be cleaned up.`, async () => {
  const baseDirName = global.baseDirName;
  const filesArray: string[] = new Array();

  const stageSplitFiles = await readdir(
    path.resolve(baseDirName, "output", "stage-split"),
  );
  const stageInferenceFiles = await readdir(
    path.resolve(baseDirName, "output", "stage-inference"),
  );
  const stageMergeFiles = await readdir(
    path.resolve(baseDirName, "output", "stage-merge"),
  );

  filesArray.concat(stageSplitFiles);
  filesArray.concat(stageInferenceFiles);
  filesArray.concat(stageMergeFiles);

  expect(
    filesArray.includes(".jpg") ||
      filesArray.includes(".json") ||
      filesArray.includes(".ts") ||
      filesArray.includes(".m3u8"),
  ).toBeFalsy();
});
