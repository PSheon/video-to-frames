module.exports = {
  /* 輸入影片 */
  INPUT_VIDEO_PATH: "input",
  INPUT_VIDEO_FILENAME: "input.mp4",
  INPUT_VIDEO_FRAME_SAMPLING: 10,

  /* 分割圖片 */
  SPLIT_FRAME_IMAGE_PREFIX: "frame",

  /* 圖片推理 */
  MODEL_NAME: "efficientpose-ii-lite",
  /* Pose Net */
  POSENET_INFERENCE_SCALE_FACTOR: 0.5,
  POSENET_INFERENCE_OUTPUT_STRIDE: 16,
  POSENET_INFERENCE_FLIP_HORIZONTAL: false,
  /* Efficient Pose */
  EFFICIENTPOSE_MODEL_MIN_SCORE_THRESHOLD: 0.45,
}
