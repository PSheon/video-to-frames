import fs from "fs";
import path from "path";

import ffmpeg, { FfprobeStream } from "fluent-ffmpeg";

import setupConfig from "../src/tasks/setup-config";
import setupDependencies from "../src/tasks/setup-dependencies";
import "../src/types";

beforeEach(async () => {
  await setupConfig();
  await setupDependencies();
});

test(`should be have ffmpeg installed.`, () => {
  const baseDirName = global.baseDirName;

  const ffmpegExist = fs.existsSync(
    path.resolve(baseDirName, "ffmpeg", "ffmpeg"),
  );
  const ffprobeExist = fs.existsSync(
    path.resolve(baseDirName, "ffmpeg", "ffprobe"),
  );
  const ffplayExist = fs.existsSync(
    path.resolve(baseDirName, "ffmpeg", "ffplay"),
  );

  expect(ffmpegExist).toBeTruthy();
  expect(ffprobeExist).toBeTruthy();
  expect(ffplayExist).toBeTruthy();
});

test(`ffmpeg library path should be setup correctly.`, async () => {
  expect(ffmpeg).toBeDefined();
});

test(`ffprobe library path should be setup correctly.`, () => {
  const baseDirName = global.baseDirName;

  ffmpeg(path.resolve(baseDirName, "input", "sample.mp4")).ffprobe(
    (err, metadata) => {
      if (err) {
        throw err;
      }

      const META_DATA = metadata.streams.find(
        (item) => item.codec_type === "video",
      ) as FfprobeStream;

      expect(metadata instanceof Array).toBeTruthy();
      expect(META_DATA.codec_name).toEqual("h264");
    },
  );
});
