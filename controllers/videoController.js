const { Video, Module } = require('../models')
const ApiError = require('../utils/apiError')

const createVid = async (req, res, next) => {
  // prettier-ignore
  const {
    title, no, videoUrl, duration, moduleId,
  } = req.body
  try {
    let idModule
    let moduleDuration
    let moduleIslocked
    if (moduleId) {
      const module = await Module.findOne({ where: { id: moduleId } })
      if (!module) {
        return next(
          new ApiError(`Cause module with id ${moduleId} not found`, 404),
        )
      }
      idModule = module.id
      moduleIslocked = module.isLocked
      moduleDuration = module.duration
    }
    if (!title || !moduleId) {
      return next(new ApiError('Title and module id are required!', 400))
    }

    const newVid = await Video.create({
      title,
      no,
      videoUrl,
      duration,
      moduleId: idModule,
      // eslint-disable-next-line comma-dangle, no-unneeded-ternary
      isLocked: moduleIslocked === false ? false : true,
    })
    if (newVid) {
      const tambahVideoDuration = moduleDuration + duration
      await Module.update(
        {
          duration: tambahVideoDuration,
        },
        { where: { id: idModule } },
      )
    }
    return res.status(201).json({
      success: true,
      message: 'Success, create video',
      data: {
        newVid,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.findAll()
    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data: {
        videos,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const deleteVideo = async (req, res, next) => {
  const { id } = req.params
  try {
    const video = await Video.findOne({
      where: { id },
    })
    const idModule = video.moduleId
    const module = await Module.findOne({ where: { id: idModule } })
    const moduleDuration = module.duration
    const videoDuration = video.duration

    const deletedVideo = await Video.destroy({ where: { id } })
    if (deletedVideo) {
      const minusDuration = moduleDuration - videoDuration
      await Module.update(
        {
          duration: minusDuration,
        },
        { where: { id: idModule } },
      )
    }
    return res.status(200).json({
      success: true,
      message: 'Success, deleted',
      data: null,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateVideo = async (req, res, next) => {
  const { id } = req.params
  // prettier-ignore
  const {
    title, no, videoUrl, duration, moduleId,
  } = req.body
  try {
    let idModule
    if (moduleId) {
      const module = await Module.findOne({ where: { id: moduleId } })
      if (!module) {
        return next(
          new ApiError(
            `Bad request / cause module with id ${moduleId} not found`,
            400,
          ),
        )
      }
      idModule = module.id
    }

    const updatedVideo = await Video.update(
      {
        title,
        no,
        duration,
        videoUrl,
        moduleId: idModule,
      },
      { where: { id }, returning: true },
    )
    return res.status(200).json({
      success: true,
      message: 'Success, updated',
      data: {
        updatedVideo,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getVideo = async (req, res, next) => {
  const { id } = req.params
  try {
    const video = await Video.findOne({ where: { id } })
    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data: {
        video,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  createVid,
  getVideos,
  deleteVideo,
  updateVideo,
  getVideo,
}
