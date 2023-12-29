const { Op } = require('sequelize')

// prettier-ignore
const {
  Course, Module, Video, Category, sequelize,
} = require('../models')
const ApiError = require('../utils/apiError')
const imagekit = require('../lib/imageKit')

const createCourse = async (req, res, next) => {
  const {
    title,
    categoryId,
    level,
    rating,
    instructor,
    telegramLink,
    about,
    objective,
    onboarding,
    price,
  } = req.body
  const { file } = req
  let image
  try {
    if (file) {
      const split = file.originalname.split('.')
      const extension = split[split.length - 1]

      const img = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      image = img.url
    }
    const category = await Category.findOne({ where: { id: categoryId } })
    if (!category) {
      return next(
        new ApiError(`Cause category with id ${categoryId} not found`, 404),
      )
    }
    const idCategory = category.id
    const data = await Course.create({
      title,
      about,
      objective,
      categoryId: idCategory,
      onboarding,
      level,
      courseType: price > 0 ? 'Premium' : 'Free',
      imageUrl: image,
      rating,
      instructor,
      duration: 0,
      telegramLink,
      moduleCount: 0,
      price,
    })

    return res.status(201).json({
      success: true,
      message: 'Success, create course',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getCourses = async (req, res, next) => {
  // eslint-disable-next-line no-nested-ternary
  const categoryIds = req.query.categoryIds
    ? Array.isArray(req.query.categoryIds)
      ? req.query.categoryIds
      : req.query.categoryIds.split(',')
    : []
  const titleSearch = req.query.title || ''
  const courseTypeSearch = req.query.courseType || ''
  const levelSearch = req.query.level || ''
  const createdAtSort = req.query.createdAt
  const popularitySort = req.query.popularity
  const whereClause = {}

  if (categoryIds.length > 0 && !categoryIds.includes('C-0ALL')) {
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
    const orderOptions = []

    if (createdAtSort) {
      orderOptions.push([
        'createdAt',
        createdAtSort === 'desc' ? 'DESC' : 'ASC',
      ])
    }

    if (popularitySort) {
      orderOptions.push([
        sequelize.literal('"popularity"'),
        popularitySort === 'desc' ? 'DESC' : 'ASC',
      ])
    }

    // prettier-ignore
    const subquery = '(SELECT COUNT(DISTINCT "userId") FROM "UserCourses" WHERE "UserCourses"."courseId" = "Course"."id")'

    const dataCourse = await Course.findAll({
      include: [
        {
          model: Module,
          attributes: [],
        },
        {
          model: Category,
          attributes: ['name'],
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
        [sequelize.literal(subquery), 'popularity'],
      ],
      order: orderOptions,
    })

    const data = dataCourse.map((course) => {
      const categoryInfo = {
        name: course['Category.name'],
      }
      return {
        ...course,
        'Category.name': undefined,
        Category: categoryInfo,
        totalDuration: course.totalDuration === null ? 0 : course.totalDuration,
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

const deleteCourse = async (req, res, next) => {
  const { id } = req.params
  try {
    await Course.destroy({ where: { id } })
    return res.status(200).json({
      success: true,
      message: 'Success, deleted',
      data: null,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getCourse = async (req, res, next) => {
  const { id } = req.params
  try {
    const course = await Course.findOne({
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

    const filteredModules = course.toJSON().Modules.map((module) => {
      const filteredVideos = module.Videos.map((video) => {
        const videos = {
          ...video,
          isLocked: module.isLocked,
        }
        return videos
      })
      return { ...module, Videos: filteredVideos }
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
        ...course.toJSON(),
        totalDuration: totalDuration === null ? 0 : totalDuration,
        Modules: filteredModules,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateCourse = async (req, res, next) => {
  const { id } = req.params
  const {
    title,
    level,
    categoryId,
    courseType,
    rating,
    instructor,
    duration,
    telegramLink,
    about,
    objective,
    onboarding,
    price,
  } = req.body
  const { file } = req
  let image
  try {
    if (file) {
      const split = file.originalname.split('.')
      const extension = split[split.length - 1]

      const img = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      image = img.url
    }
    let idCategory
    if (categoryId) {
      const category = await Category.findOne({ where: { id: categoryId } })
      if (!category) {
        return next(
          new ApiError(`Cause category with id ${categoryId} not found`, 404),
        )
      }
      idCategory = category.id
    }
    await Course.update(
      {
        title,
        level,
        rating,
        courseType,
        instructor,
        duration,
        telegramLink,
        about,
        objective,
        onboarding,
        price,
        categoryId: idCategory,
        imageUrl: image,
      },
      { where: { id } },
    )

    return res.status(200).json({
      success: true,
      message: 'Success, updated',
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  createCourse,
  getCourses,
  deleteCourse,
  getCourse,
  updateCourse,
}
