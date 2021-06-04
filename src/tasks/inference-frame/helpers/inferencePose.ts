import PROCESS_ENV from "config";

import chalk from "chalk";

import posenet from "./posenet";
import blazepose from "./blazepose";
import efficientpose from "./efficientpose";
import movenet from "./movenet";

import { getModelType } from "./shared";
import { IInferencePoseInput } from "../../../types";

export default function ({ spinner }: IInferencePoseInput): Promise<void> {
  return new Promise(async (resolve) => {
    const modelName = String(PROCESS_ENV.get("MODEL_NAME"));
    console.log(`\n🔬 使用 ${chalk.blue(modelName)} 模型`);

    if (getModelType(modelName) === "posenet") {
      await posenet({ spinner });
    }
    if (getModelType(modelName) === "blazepose") {
      await blazepose({ spinner, modelName });
    }
    if (getModelType(modelName) === "efficientpose") {
      await efficientpose({ spinner, modelName });
    }
    if (getModelType(modelName) === "movenet") {
      await movenet({ spinner, modelName });
    }
    resolve();
  });
}
