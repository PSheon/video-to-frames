import { Ora } from "ora";

export type TConfig = {
  INPUT_VIDEO_PATH: string;
  INPUT_VIDEO_FILENAME: string;
  INPUT_VIDEO_FRAME_SAMPLING: number;

  SPLIT_FRAME_IMAGE_PREFIX: string;

  MODEL_NAME:
    | "posenet"
    | "efficientpose-i-lite"
    | "efficientpose-ii-lite"
    | "efficientpose-iv"
    | "movenet-lightning"
    | "movenet-thunder";

  POSENET_INFERENCE_FLIP_HORIZONTAL: boolean;
  EFFICIENTPOSE_MODEL_MIN_SCORE_THRESHOLD: number;
};

export interface IValidConfigInput {
  spinner: Ora;
  config: TConfig;
}
