'use strict'

const PROCESS_ENV = require('config')

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const ffmpeg = require('fluent-ffmpeg')

module.exports = () =>
  new Promise((resolve, reject) => {
    const spinner = new ora('分割影片中...').start()
    const baseDirName = path.dirname(require.main.filename)

    ffmpeg.setFfmpegPath(
      path.resolve(baseDirName, path.join(baseDirName, 'ffmpeg', 'ffmpeg')),
    )
    ffmpeg.setFfprobePath(
      path.resolve(baseDirName, path.join(baseDirName, 'ffmpeg', 'ffprobe')),
    )

    ffmpeg(
      path.resolve(
        baseDirName,
        PROCESS_ENV.INPUT_VIDEO_PATH,
        PROCESS_ENV.INPUT_VIDEO_FILENAME,
      ),
    )
      .on('codecData', (data) => {
        spinner.text = `Input is ${data.audio} audio with ${data.video} video"`
      })
      .on('error', (err, stdout, stderr) => {
        spinner.fail(`${chalk.red('[階段一]')} 影片分割失敗: ${err.message}`)
        reject(err.message)
      })
      .on('end', (stdout, stderr) => {
        spinner.succeed(`${chalk.green('[階段一]')} 影片分割完成！`)
        resolve()
      })
      .fps(PROCESS_ENV.INPUT_VIDEO_FRAME_SAMPLING)
      .save(
        path.resolve(
          baseDirName,
          'output',
          'stage-split',
          `${PROCESS_ENV.SPLIT_FRAME_IMAGE_PREFIX}_%05d.jpg`,
        ),
      )
      .ffprobe(function (err, metadata) {
        const videoMetadata = metadata.streams.find(
          (item) => item.codec_type == 'video',
        )

        const META_DATA = {
          duration: videoMetadata.duration,
          width: videoMetadata.width,
          height: videoMetadata.height,
        }

        fs.writeFileSync(
          path.resolve(
            baseDirName,
            'output',
            'stage-split',
            'frame_metadata.json',
          ),
          JSON.stringify(META_DATA),
        )
      })
  })
