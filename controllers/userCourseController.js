const { Op } = require('sequelize')

// prettier-ignore
const {
  Course, Module, Video, Category, sequelize, UserCourse,
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
      ],
    })

    const data = dataUserCourse.map((course) => {
      const categoryInfo = {
        name: course['Category.name'],
      }
      return {
        ...course,
        Category: categoryInfo,
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
    const totalDuration = await Module.sum('duration', {
      where: {
        courseId: id,
      },
    })
    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data: {
        ...data.toJSON(),
        totalDuration,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

// const updateCourseProgress = async (req, res, next) => {
//   const { id } = req.params
// }

module.exports = {
  getUserCourses,
  getUserCourse,
  // updateCourseProgress,
}
