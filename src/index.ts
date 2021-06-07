import setupConfig from "./tasks/setup-config";
import setupDependencies from "./tasks/setup-dependencies";
import preparingInput from "./tasks/preparing-input";
import splitFrames from "./tasks/split-frames";
import inferenceFrame from "./tasks/inference-frame";

const pipeline = async (): Promise<void> => {
  /* Environment Setup */
  await setupConfig();
  await setupDependencies();

  /* Stage 1 - Preparing Video or Image */
  await preparingInput();

  /* Stage 2 - Split Frames */
  await splitFrames();

  /* Stage 3 - Inference Frame */
  await inferenceFrame();
};
pipeline();
