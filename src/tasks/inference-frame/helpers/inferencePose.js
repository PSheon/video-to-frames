"use strict";

const PROCESS_ENV = require("config");

const chalk = require("chalk");

const posenet = require("./posenet");
const blazepose = require("./blazepose");
const efficientpose = require("./efficientpose");
const { getModelType } = require("./shared");

module.exports = (spinner) =>
  new Promise(async (resolve) => {
    const modelName = PROCESS_ENV.MODEL_NAME;
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
    resolve();
  });
