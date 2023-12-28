const { Op } = require('sequelize')
// prettier-ignore
const {
  Course, Module, Video, Category, sequelize, UserCourse, UserVideo, Notification, Payment,
} = require('../models')
const ApiError = require('../utils/apiError')

const getUserCourses = async (req, res, next) => {
  const categoryIds = req.query.categoryIds
    ? req.query.categoryIds.split(',')
    : []
  const titleSearch = req.query.title || ''
  const courseTypeSearch = req.query.courseType || ''
  const levelSearch = req.query.level || ''
  const whereClause = {}

  if (categoryIds.length > 0 || categoryIds.includes('ALL')) {
    whereClause.categoryId = {
      [Op.in]: categoryIds,
    }
  }

  if (titleSearch) {
    whereClause.title = {
      [Op.iLike]: `%${titleSearch}%`,
    }
  }

  if (courseTypeSearch) {
    whereClause.courseType = courseTypeSearch
  }

  if (levelSearch) {
    whereClause.level = levelSearch
  }
  try {
    const dataUserCourse = await Course.findAll({
      include: [
        {
          model: Module,
          attributes: [],
          include: [
            {
              model: Video,
              attributes: [],
              include: [
                {
                  model: UserVideo,
                  attributes: [],
                },
              ],
            },
          ],
        },
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: UserCourse,
          attributes: [],
          where: {
            userId: req.user.id,
          },
        },
      ],
      where: whereClause,
      raw: true,
      group: ['Course.id', 'Category.id'],
      attributes: [
        '*',
        [
          sequelize.fn('SUM', sequelize.col('Modules.duration')),
          'totalDuration',
        ],
        [
          sequelize.literal('COUNT(DISTINCT "Modules->Videos->UserVideos".id)'),
          'watchedVideo',
        ],
        [
          sequelize.literal('COUNT(DISTINCT "Modules->Videos".id)'),
          'totalVideo',
        ],
      ],
    })

    const data = dataUserCourse.map((course) => {
      const categoryInfo = {
        name: course['Category.name'],
      }
      return {
        ...course,
        'Category.name': undefined,
        Category: categoryInfo,
        watchedVideo: undefined,
        totalVideo: undefined,
        totalDuration: course.totalDuration === null ? 0 : course.totalDuration,
        progress: (course.watchedVideo / course.totalVideo) * 100,
      }
    })
    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getUserCourseById = async (req, res, next) => {
  const courseId = req.params.id
  try {
    const course = await Course.findOne({
      where: {
        id: courseId,
      },
      include: [
        {
          model: Category,
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        },
        {
          model: UserCourse,
          attributes: [],
          where: {
            userId: req.user.id,
          },
        },
        {
          model: Module,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Video,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
    })

    const isCoursePurchased = await Payment.findOne({
      where: {
        userId: req.user.id,
        courseId,
        status: {
          [Op.in]: ['settlement', 'capture'],
        },
      },
    })

    if (!course) {
      return next(
        new ApiError(
          'You have not enroll this course yet, or course not available',
          404,
        ),
      )
    }

    const totalDuration = await Module.sum('duration', {
      where: {
        courseId,
      },
    })

    const watchedVideos = await UserVideo.findAll({
      where: {
        courseId,
        userId: req.user.id,
      },
    })

    const filteredModules = course.toJSON().Modules.map((module) => {
      const filteredVideos = module.Videos.map((video) => {
        const watchedVideosId = watchedVideos.map(
          (watchedVideo) => watchedVideo.videoId,
        )
        const videos = {
          ...video,
          isWatched: watchedVideosId.includes(video.id),
          isLocked: module.isLocked && !isCoursePurchased,
        }
        return videos
      })
      if (isCoursePurchased) {
        return { ...module, isLocked: false, Videos: filteredVideos }
      }
      return { ...module, Videos: filteredVideos }
    })

    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data: {
        ...course.toJSON(),
        totalDuration: totalDuration === null ? 0 : totalDuration,
        Modules: filteredModules,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const enrollCourse = async (req, res, next) => {
  const courseId = req.params.id

  try {
    const alreadyEnrolled = await UserCourse.findOne({
      where: {
        userId: req.user.id,
        courseId,
      },
    })

    if (alreadyEnrolled) {
      return next(new ApiError('Course already enrolled', 400))
    }

    await UserCourse.create({
      userId: req.user.id,
      courseId,
    })

    await Notification.create({
      title: 'Enrollment Success',
      description:
        'Congratulations, your course enroll has been successful. Lets continue to study the course you enrolled',
      isRead: false,
      userId: req.user.id,
    })

    return res.status(200).json({
      success: true,
      message: 'Success enroll course',
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  enrollCourse,
  getUserCourses,
  getUserCourseById,
}
