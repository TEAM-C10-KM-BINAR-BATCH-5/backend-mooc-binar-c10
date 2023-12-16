// prettier-ignore
const {
  Video, UserVideo, Module, UserCourse,
} = require('../models')
const ApiError = require('../utils/apiError')

const updateProgress = async (req, res, next) => {
  const videoId = Number(req.params.id)
  try {
    const video = await Video.findByPk(videoId, {
      include: [
        {
          model: Module,
          attributes: ['courseId'], // need isLocked attribute
        },
      ],
    })
    if (!video) {
      return next(new ApiError('id does not exist', 404))
    }
    const isCourseEnrolled = await UserCourse.findOne({
      where: {
        userId: req.user.id,
        courseId: video.Module.courseId,
      },
    })

    if (!isCourseEnrolled) {
      return next(new ApiError('You have not enroll this course yet', 400))
    }

    // if (video.Module.courseType === 'Premium' && video.Module.isLocked) {
    //   const isPuchased = await UserCourse.findOne({
    //     where: {
    //       userId: req.user.id,
    //       courseId: video.Module.courseId,
    //     },
    //   })
    // }

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
