import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import path from "path";

import ffmpeg, { FfprobeStream } from "fluent-ffmpeg";

import preparingInput from "../src/tasks/preparing-input";
import setupConfig from "../src/tasks/setup-config";
import setupDependencies from "../src/tasks/setup-dependencies";
import splitFrames from "../src/tasks/split-frames";
import "../src/types";

describe(`E2E test - setup`, () => {
  beforeAll(async () => {
    await setupConfig();
    await setupDependencies();
  });

  it(`should has global 'baseDirName' string.`, () => {
    const baseDirName = global.baseDirName;

    expect(typeof baseDirName).toBe("string");
  });

  it(`should has global 'inputMimeType' string.`, () => {
    const inputMimeType = global.inputMimeType;

    expect(
      inputMimeType.includes("video") || inputMimeType.includes("image"),
    ).toBeTruthy();
  });

  it(`should has global 'eventBus' store.`, () => {
    const eventBus = global.eventBus;

    expect(eventBus.on).toBeDefined();
    expect(eventBus.emit).toBeDefined();
  });

  it(`folder output should be cleaned up.`, async () => {
    const baseDirName = global.baseDirName;
    let filesArray: string[] = [];
    let existOtherFiles = false;

    const stageSplitFiles = await readdir(
      path.resolve(baseDirName, "output", "stage-split"),
    );
    const stageInferenceFiles = await readdir(
      path.resolve(baseDirName, "output", "stage-inference"),
    );
    const stageMergeFiles = await readdir(
      path.resolve(baseDirName, "output", "stage-merge"),
    );

    filesArray = stageSplitFiles.concat(stageInferenceFiles, stageMergeFiles);
    filesArray.forEach((item) => {
      if (item.includes(".jpg") || item.includes(".json")) {
        existOtherFiles = true;
        return;
      }
    });

    expect(existOtherFiles).toBeFalsy();
  });

  it(`should be have ffmpeg installed.`, async () => {
    const baseDirName = global.baseDirName;

    const ffmpegExist = existsSync(
      path.resolve(baseDirName, "ffmpeg", "ffmpeg"),
    );
    const ffprobeExist = existsSync(
      path.resolve(baseDirName, "ffmpeg", "ffprobe"),
    );

    expect(ffmpegExist).toBeTruthy();
    expect(ffprobeExist).toBeTruthy();
  });

  it(`ffmpeg library path should be setup correctly.`, async () => {
    expect(ffmpeg).toBeDefined();
  });

  it(`ffprobe library path should be setup correctly.`, async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const baseDirName = global.baseDirName;

      ffmpeg(path.resolve(baseDirName, "input", "sample.mp4")).ffprobe(
        (err, metadata) => {
          if (err) {
            reject(err);
          }

          const META_DATA = metadata.streams.find(
            (item) => item.codec_type === "video",
          ) as FfprobeStream;

          expect(metadata.streams).toBeDefined();
          expect(metadata.streams instanceof Array).toBeTruthy();
          expect(META_DATA.codec_name).toEqual("h264");
          resolve();
        },
      );
    });
  });
});

describe(`E2E test - run pipeline`, () => {
  beforeAll(async () => {
    await preparingInput();

    await splitFrames();
  });

  it(`should generate metadata.json.`, async () => {
    const baseDirName = global.baseDirName;

    const META_DATA = await readFile(
      path.resolve(baseDirName, "output", "stage-split", "frame_metadata.json"),
    );

    const metadata = JSON.parse(META_DATA.toString());

    expect(typeof metadata.duration).toBe("number");
    expect(typeof metadata.width).toBe("number");
    expect(typeof metadata.height).toBe("number");
  });

  it(`should split video to 640x640 frames.`, async () => {
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
});
