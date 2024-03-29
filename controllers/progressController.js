const { Op } = require('sequelize')
// prettier-ignore
const {
  Video, UserVideo, Module, UserCourse, Payment,
} = require('../models')
const ApiError = require('../utils/apiError')

const updateProgress = async (req, res, next) => {
  const videoId = Number(req.params.id)
  try {
    const video = await Video.findByPk(videoId, {
      include: [
        {
          model: Module,
          attributes: ['courseId', 'isLocked'],
        },
      ],
    })
    const isCourseEnrolled = await UserCourse.findOne({
      where: {
        userId: req.user.id,
        courseId: video.Module.courseId,
      },
    })

    if (!isCourseEnrolled) {
      return next(new ApiError('You have not enroll this course yet', 400))
    }

    if (video.Module.isLocked) {
      const isPurchased = await Payment.findOne({
        where: {
          userId: req.user.id,
          courseId: video.Module.courseId,
          status: {
            [Op.in]: ['settlement', 'capture'],
          },
        },
      })
      if (!isPurchased) {
        return next(new ApiError('You have not purchase this course yet', 400))
      }
    }

    const checkUserVideo = await UserVideo.findOne({
      where: {
        userId: req.user.id,
        videoId: video.id,
      },
    })

    if (checkUserVideo) {
      return next(new ApiError('Already watch this video', 400))
    }

    await UserVideo.create({
      userId: req.user.id,
      videoId: video.id,
      courseId: video.Module.courseId,
    })

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
