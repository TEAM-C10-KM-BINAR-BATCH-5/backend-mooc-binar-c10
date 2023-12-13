const { Op } = require('sequelize')
const uuidv4 = require('uuid').v4
const fetch = require('node-fetch')
// prettier-ignore
const {
  Course, Module, Video, Category, sequelize, UserCourse, UserVideo, Payment, Notification,
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
      return next(
        new ApiError(
          'You have not purchased this course yet, or course not available',
          404,
        ),
      )
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

const enrollCourse = async (req, res, next) => {
  const courseId = req.params.id

  try {
    const course = await Course.findOne({
      where: {
        id: courseId,
      },
    })

    const alreadyEnrolled = await UserCourse.findOne({
      userId: req.user.id,
      courseId,
    })

    if (alreadyEnrolled) {
      return next(new ApiError('Course already enrolled', 400))
    }

    if (course.courseType === 'Free') {
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

      return res.status(201).json({
        success: true,
        message: 'Success enroll course',
      })
    }

    const orderId = uuidv4()

    const dataTransaction = {
      transaction_details: {
        order_id: orderId,
        gross_amount: course.price,
      },
      customer_details: {
        first_name: req.user.name,
        email: req.user.Auth.email,
      },
    }

    const transaction = await fetch(process.env.MIDTRANS_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${process.env.MIDTRANS_SERVER_KEY_HASHED}`,
      },
      body: JSON.stringify(dataTransaction),
    })

    const transactionResponse = await transaction.json()

    await Payment.create({
      id: orderId,
      courseId,
      userId: req.user.id,
      payment_type: 'midtrans',
      status: 'pending',
      amount: course.price,
      gross_amount: course.price,
      date: new Date(),
    })

    return res.status(200).json({
      success: true,
      message: 'Success initiating payment',
      data: {
        ...transactionResponse,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 400))
  }
}

module.exports = {
  enrollCourse,
  getUserCourses,
  getUserCourse,
}
