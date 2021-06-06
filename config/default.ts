export default {
  /* 全域設定 */
  DELETE_PREVIOUS_OUTPUT: true,

  /* 輸入設定 */
  INPUT_FILEPATH: "input",
  INPUT_FILENAME: "input.mp4",

  /* 分割圖片 */
  SPLIT_FRAME_IMAGE_PREFIX: "frame",
  INPUT_VIDEO_FRAME_SAMPLING: 10,

  /* 圖片推理 */
  MODEL_NAME: "efficientpose-ii-lite",
  /* Pose Net */
  POSENET_INFERENCE_FLIP_HORIZONTAL: false,
  /* Efficient Pose */
  EFFICIENTPOSE_MODEL_MIN_SCORE_THRESHOLD: 0.45,
};
