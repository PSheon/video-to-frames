import { Ora } from "ora";

export type TConfig = {
  DELETE_PREVIOUS_OUTPUT: boolean;
  INPUT_FILEPATH: string;
  INPUT_FILENAME: string;

  SPLIT_FRAME_IMAGE_PREFIX: string;
  INPUT_VIDEO_FRAME_SAMPLING: number;

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

export interface ICheckConfigInput {
  spinner: Ora;
  baseDirName: string;
}
export interface IGetConfigGlobalSettingsInput {
  spinner: Ora;
  baseDirName: string;
}
export interface IGetConfigGlobalSettingsOutput {
  fileMimeType: string;
}
