import { Ora } from "ora";

export type TConfig = {
  /* 全域設定 */
  DELETE_PREVIOUS_OUTPUT: boolean;

  /* 輸入設定 */
  INPUT_FILEPATH: string;
  INPUT_FILENAME: string;

  /* 分割圖片設定 */
  SPLIT_FRAME_IMAGE_PREFIX: string;
  INPUT_VIDEO_START_TIME: string;
  INPUT_VIDEO_DURATION: string;
  INPUT_VIDEO_FRAME_SAMPLING: number;

  /* 模型設定 */
  MODEL_NAME:
    | "posenet"
    | "efficientpose-i-lite"
    | "efficientpose-ii-lite"
    | "efficientpose-iv"
    | "movenet-lightning"
    | "movenet-thunder"
    | "blazepose-full"
    | "blazepose-upper";

  POSENET_INFERENCE_FLIP_HORIZONTAL: boolean;
  EFFICIENTPOSE_MODEL_MIN_SCORE_THRESHOLD: number;
  BLAZEPOSE_MODEL_MIN_SCORE_THRESHOLD: number;
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
  inputMimeType: string;
}
