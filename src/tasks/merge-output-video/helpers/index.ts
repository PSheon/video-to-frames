import path from "path";

import mergeFramesToVideo from "./merge-frames-to-video";

const getMergeOutputDirname = (): string => {
  const baseDirName = global.baseDirName;

  return path.resolve(baseDirName, "output", "stage-merge");
};

export { mergeFramesToVideo, getMergeOutputDirname };
