// prettier-ignore
const {
  Video, UserVideo, Module,
} = require('../models')
const ApiError = require('../utils/apiError')

const updateProgress = async (req, res, next) => {
  const videoId = Number(req.params.id)
  try {
    const video = await Video.findByPk(videoId, {
      include: [
        {
          model: Module,
          attributes: ['courseId'],
        },
      ],
    })
    if (!video) {
      return next(new ApiError('id does not exist', 404))
    }
    const checkUserVideo = await UserVideo.findOne({
      where: {
        userId: req.user.id,
        videoId: video.id,
        courseId: video.Module.courseId,
      },
    })

    if (!checkUserVideo) {
      await UserVideo.create({
        userId: req.user.id,
        videoId: video.id,
        courseId: video.Module.courseId,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Success update progress',
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  updateProgress,
}
