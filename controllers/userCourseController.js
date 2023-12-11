const { Op } = require('sequelize')

// prettier-ignore
const {
  Course, Module, Video, Category, sequelize, UserCourse, UserVideo,
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

  if (categoryIds.length > 0) {
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
    // const dataUserCourse = await UserCourse.findAll({
    //   where: {
    //     userId: req.user.id,
    //   },
    //   include: {
    //     model: Course,
    //     include: [
    //       {
    //         model: Module,
    //         attributes: [],
    //       },
    //       {
    //         model: Category,
    //         attributes: ['name'],
    //       },
    //     ],
    //     where: whereClause,
    //     attributes: [
    //       '*',
    //       [
    //         sequelize.fn('SUM', sequelize.col('Course.Modules.duration')),
    //         'totalDuration',
    //       ],
    //     ],
    //   },
    //   raw: true,
    //   group: ['UserCourse.id', 'Course.id', 'Course.Category.id'],
    //   subQuery: false,
    //   distinct: true,
    // })

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

const getUserCourse = async (req, res, next) => {
  const { id } = req.params
  try {
    const data = await Course.findOne({
      where: { id },
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

    if (!data) {
      return next(new ApiError('You have not purchased this course yet', 404))
    }

    const totalDuration = await Module.sum('duration', {
      where: {
        courseId: id,
      },
    })

    const watchedVideos = await UserVideo.findAll({
      where: {
        courseId: id,
        userId: req.user.id,
      },
    })

    const filteredModules = data.toJSON().Modules.map((module) => {
      const filteredVideos = module.Videos.map((video) => {
        const watchedVideosId = watchedVideos.map(
          (watchedVideo) => watchedVideo.videoId,
        )
        const videos = {
          ...video,
          isWatched: watchedVideosId.includes(video.id),
        }
        return videos
      })
      return { ...module, Videos: filteredVideos }
    })

    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data: {
        ...data.toJSON(),
        totalDuration,
        Modules: filteredModules,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  getUserCourses,
  getUserCourse,
}
