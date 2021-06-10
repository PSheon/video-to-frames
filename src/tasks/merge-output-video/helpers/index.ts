import path from "path";

import copyFrameFromInference from "./copy-frame-from-inference";
import mergeFramesToVideo from "./merge-frames-to-video";
import mergeInferenceJson from "./merge-inference-json";

const getMergeOutputDirname = (): string => {
  const baseDirName = global.baseDirName;

  return path.resolve(baseDirName, "output", "stage-merge");
};

export {
  mergeFramesToVideo,
  copyFrameFromInference,
  mergeInferenceJson,
  getMergeOutputDirname,
};
