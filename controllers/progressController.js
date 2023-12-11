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
    await UserVideo.create({
      userId: req.user.id,
      courseId: video.Module.couseId,
    })
    return res.status(200).json({
      success: true,
      message: 'Success update progress',
      data: video,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  updateProgress,
}
