'use strict'

const setupConfig = require('./src/tasks/setup-config')
const setupDependencies = require('./src/tasks/setup-dependencies')
const preparingVideo = require('./src/tasks/preparing-video')
const splitFrames = require('./src/tasks/split-frames')
const inferenceFrame = require('./src/tasks/inference-frame')

const pipeline = async () => {
  /* Environment Setup */
  setupConfig()
  await setupDependencies()

  /* Preparing - Preparing Video */
  await preparingVideo()

  /* Stage 1 - Split Frames */
  await splitFrames()

  /* Stage 2 - Inference Frame */
  await inferenceFrame()
}
pipeline()
