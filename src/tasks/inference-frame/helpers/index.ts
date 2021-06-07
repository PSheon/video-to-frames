import path from "path";

import inferencePoseProcess from "./inferencePose";

const getInferenceOutputDirname = (): string => {
  const baseDirName = global["baseDirName"];

  return path.resolve(baseDirName, "output", "stage-inference");
};

export { inferencePoseProcess, getInferenceOutputDirname };
