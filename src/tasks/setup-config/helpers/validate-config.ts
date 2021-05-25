import Ajv, { JTDSchemaType } from "ajv/dist/jtd";

import chalk from "chalk";
import localizeError from "tasks/setup-config/helpers/localize-error";
import { TConfig, IValidConfigInput } from "types";

const ajv = new Ajv({ allErrors: true });

const CONFIG_SCHEMA: JTDSchemaType<TConfig> = {
  properties: {
    INPUT_VIDEO_PATH: { type: "string" },
    INPUT_VIDEO_FILENAME: { type: "string" },
    INPUT_VIDEO_FRAME_SAMPLING: { type: "int32" },
    SPLIT_FRAME_IMAGE_PREFIX: { type: "string" },
    MODEL_NAME: {
      enum: [
        "posenet",
        "efficientpose-i-lite",
        "efficientpose-ii-lite",
        "efficientpose-iv",
      ],
    },
    POSENET_INFERENCE_SCALE_FACTOR: { type: "float32" },
    POSENET_INFERENCE_OUTPUT_STRIDE: { type: "int32" },
    POSENET_INFERENCE_FLIP_HORIZONTAL: { type: "boolean" },
    EFFICIENTPOSE_MODEL_MIN_SCORE_THRESHOLD: { type: "float32" },
  },
};

export default function ({ spinner, config }: IValidConfigInput): TConfig {
  const validate = ajv.compile(CONFIG_SCHEMA);
  validate(config);

  if (validate.errors) {
    spinner.fail(`${chalk.red("[環境設定]")} 設定內容錯誤：`);
    const errorMessage = localizeError(validate.errors);
    console.log(errorMessage);

    process.exit(1);
  } else {
    return config;
  }
}
