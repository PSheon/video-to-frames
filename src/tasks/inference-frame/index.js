'use strict'

const ora = require('ora')
const chalk = require('chalk')

const { inferencePoseProcess } = require('./helpers')

module.exports = () =>
  new Promise(async (resolve) => {
    const spinner = new ora(`${chalk.green('[階段二]')} 推理影片中...`).start()

    const startTime = process.hrtime.bigint()
    await inferencePoseProcess(spinner)
    const endTime = process.hrtime.bigint()

    console.log(
      `\n🎉 推理總耗時 ${chalk.green(
        Math.round(
          parseInt((endTime - startTime).toString()) / 1000 / 1000 / 1000,
        ),
      )} 秒`,
    )

    spinner.succeed(`${chalk.green('[階段二]')} 影片推理完成！`)
    resolve()
  })
