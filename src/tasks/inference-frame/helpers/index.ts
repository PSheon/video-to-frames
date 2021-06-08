import path from "path";

import inferencePoseProcess from "./inference-pose";

const getInferenceOutputDirname = (): string => {
  const baseDirName = global.baseDirName;

  return path.resolve(baseDirName, "output", "stage-inference");
};

export { inferencePoseProcess, getInferenceOutputDirname };
