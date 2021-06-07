import Ajv, { JTDSchemaType } from "ajv/dist/jtd";
import chalk from "chalk";
import { IValidConfigInput, TConfig } from "types";

import localizeError from "./localize-error";

const ajv = new Ajv({ allErrors: true });

const CONFIG_SCHEMA: JTDSchemaType<TConfig> = {
  properties: {
    DELETE_PREVIOUS_OUTPUT: { type: "boolean" },
    INPUT_FILEPATH: { type: "string" },
    INPUT_FILENAME: { type: "string" },
    SPLIT_FRAME_IMAGE_PREFIX: { type: "string" },
    INPUT_VIDEO_START_TIME: { type: "string" },
    INPUT_VIDEO_DURATION: { type: "string" },
    INPUT_VIDEO_FRAME_SAMPLING: { type: "int32" },
    MODEL_NAME: {
      enum: [
        "posenet",
        "efficientpose-i-lite",
        "efficientpose-ii-lite",
        "efficientpose-iv",
        "movenet-lightning",
        "movenet-thunder",
      ],
    },
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
    /* tslint:disable:no-console */
    console.log(errorMessage);
    /* tslint:enable:no-console */

    process.exit(1);
  } else {
    return config;
  }
}
