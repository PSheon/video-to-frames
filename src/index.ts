import setupConfig from "./tasks/setup-config";
import setupDependencies from "./tasks/setup-dependencies";
import preparingVideo from "./tasks/preparing-video";
import splitFrames from "./tasks/split-frames";
import inferenceFrame from "./tasks/inference-frame";

const pipeline = async (): Promise<void> => {
  /* Environment Setup */
  await setupConfig();
  await setupDependencies();

  /* Preparing - Preparing Video */
  await preparingVideo();

  /* Stage 1 - Split Frames */
  await splitFrames();

  /* Stage 2 - Inference Frame */
  await inferenceFrame();
};
pipeline();
