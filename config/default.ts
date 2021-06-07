export default {
  /* 全域設定 */
  DELETE_PREVIOUS_OUTPUT: true,

  /* 輸入設定 */
  INPUT_FILEPATH: "input",
  INPUT_FILENAME: "sample.mp4",

  /* 分割圖片設定 */
  SPLIT_FRAME_IMAGE_PREFIX: "frame",
  INPUT_VIDEO_START_TIME: "0.0",
  INPUT_VIDEO_DURATION: "30.0",
  INPUT_VIDEO_FRAME_SAMPLING: 10,

  /* 模型設定 */
  MODEL_NAME: "efficientpose-ii-lite",
  /* Pose Net */
  POSENET_INFERENCE_FLIP_HORIZONTAL: false,
  /* Efficient Pose */
  EFFICIENTPOSE_MODEL_MIN_SCORE_THRESHOLD: 0.45,
};
