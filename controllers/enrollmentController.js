// const { Op } = require('sequelize')
const uuidv4 = require('uuid').v4
const fetch = require('node-fetch')
// prettier-ignore
const {
  Course, Module, Video, sequelize, UserCourse, UserVideo, Payment,
  Notification, UserModule,
} = require('../models')
const ApiError = require('../utils/apiError')

// const getUserCourses = async (req, res, next) => {
//   const categoryIds = req.query.categoryIds
//     ? req.query.categoryIds.split(',')
//     : []
//   const titleSearch = req.query.title || ''
//   const courseTypeSearch = req.query.courseType || ''
//   const levelSearch = req.query.level || ''
//   const whereClause = {}

//   if (categoryIds.length > 0) {
//     whereClause.categoryId = {
//       [Op.in]: categoryIds,
//     }
//   }

//   if (titleSearch) {
//     whereClause.title = {
//       [Op.iLike]: `%${titleSearch}%`,
//     }
//   }

//   if (courseTypeSearch) {
//     whereClause.courseType = courseTypeSearch
//   }

//   if (levelSearch) {
//     whereClause.level = levelSearch
//   }
//   try {
//     const dataUserCourse = await Course.findAll({
//       include: [
//         {
//           model: Module,
//           attributes: [],
//           include: [
//             {
//               model: Video,
//               attributes: [],
//               include: [
//                 {
//                   model: UserVideo,
//                   attributes: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           model: Category,
//           attributes: ['name'],
//         },
//         {
//           model: UserCourse,
//           attributes: [],
//           where: {
//             userId: req.user.id,
//           },
//         },
//       ],
//       where: whereClause,
//       raw: true,
//       group: ['Course.id', 'Category.id'],
//       attributes: [
//         '*',
//         [
//           sequelize.fn('SUM', sequelize.col('Modules.duration')),
//           'totalDuration',
//         ],
//         [
//           sequelize.literal('COUNT(DISTINCT "Modules->Videos->UserVideos".id)'),
//           'watchedVideo',
//         ],
//         [
//           sequelize.literal('COUNT(DISTINCT "Modules->Videos".id)'),
//           'totalVideo',
//         ],
//       ],
//     })

//     const data = dataUserCourse.map((course) => {
//       const categoryInfo = {
//         name: course['Category.name'],
//       }
//       return {
//         ...course,
//         'Category.name': undefined,
//         Category: categoryInfo,
//         watchedVideo: undefined,
//         totalVideo: undefined,
//         totalDuration: course.totalDuration === null ? 0 : course.totalDuration,
//         progress: (course.watchedVideo / course.totalVideo) * 100,
//       }
//     })
//     return res.status(200).json({
//       success: true,
//       message: 'Success, fetch',
//       data,
//     })
//   } catch (error) {
//     return next(new ApiError(error.message, 500))
//   }
// }

// const getUserCourse = async (req, res, next) => {
//   const { id } = req.params
//   try {
//     const data = await Course.findOne({
//       where: { id },
//       include: [
//         {
//           model: Category,
//           attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
//         },
//         {
//           model: UserCourse,
//           attributes: [],
//           where: {
//             userId: req.user.id,
//           },
//         },
//         {
//           model: Module,
//           attributes: { exclude: ['createdAt', 'updatedAt'] },
//           include: [
//             {
//               model: Video,
//               attributes: { exclude: ['createdAt', 'updatedAt'] },
//             },
//           ],
//         },
//       ],
//     })

//     if (!data) {
//       return next(
//         new ApiError(
//           'You have not purchased this course yet, or course not available',
//           404,
//         ),
//       )
//     }

//     const totalDuration = await Module.sum('duration', {
//       where: {
//         courseId: id,
//       },
//     })

//     const watchedVideos = await UserVideo.findAll({
//       where: {
//         courseId: id,
//         userId: req.user.id,
//       },
//     })

//     const filteredModules = data.toJSON().Modules.map((module) => {
//       const filteredVideos = module.Videos.map((video) => {
//         const watchedVideosId = watchedVideos.map(
//           (watchedVideo) => watchedVideo.videoId,
//         )
//         const videos = {
//           ...video,
//           isWatched: watchedVideosId.includes(video.id),
//         }
//         return videos
//       })
//       return { ...module, Videos: filteredVideos }
//     })

//     return res.status(200).json({
//       success: true,
//       message: 'Success, fetch',
//       data: {
//         ...data.toJSON(),
//         totalDuration,
//         Modules: filteredModules,
//       },
//     })
//   } catch (error) {
//     return next(new ApiError(error.message, 500))
//   }
// }

const enrollCourse = async (req, res, next) => {
  // cuourseId
  const { id } = req.params

  try {
    const course = await Course.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Module,
          include: [
            {
              model: Video,
            },
          ],
        },
      ],
    })

    const isUserEnrolled = await UserCourse.findOne({
      where: { courseId: id },
    })
    if (isUserEnrolled) {
      return next(new ApiError('You already enrolled this course', 400))
    }

    if (course.courseType === 'Free') {
      const userCourse = await UserCourse.create({
        userId: req.user.id,
        courseId: id,
        title: course.title,
        about: course.about,
        objective: course.objective,
        categoryId: course.categoryId,
        onboarding: course.onboarding,
        level: course.level,
        courseType: course.courseType,
        imageUrl: course.imageUrl,
        rating: course.rating,
        instructor: course.instructor,
        duration: course.duration,
        telegramLink: course.telegramLink,
        moduleCount: course.moduleCount,
        price: course.price,
      })

      const modules = await Module.findAll({ where: { courseId: course.id } })

      // eslint-disable-next-line no-restricted-syntax
      for (const module of modules) {
        // eslint-disable-next-line no-await-in-loop
        const userModule = await UserModule.create({
          userId: req.user.id,
          moduleId: module.id,
          title: module.title,
          duration: module.duration,
          userCourseId: userCourse.id,
          isLocked: false,
        })

        // eslint-disable-next-line no-await-in-loop
        const videos = await Video.findAll({ where: { moduleId: module.id } })

        // eslint-disable-next-line no-restricted-syntax
        for (const video of videos) {
          // eslint-disable-next-line no-await-in-loop
          await UserVideo.create({
            userId: req.user.id,
            videoId: video.id,
            courseId: id,
            title: video.title,
            no: video.no,
            videoUrl: video.videoUrl,
            duration: video.duration,
            userModuleId: userModule.id,
            isLocked: false,
          })
        }
      }

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
      courseId: id,
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

const getUserCourses = async (req, res, next) => {
  try {
    const data = await UserCourse.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: UserModule,
          attributes: [],
        },
      ],
      raw: true,
      group: ['UserCourse.id'],
      attributes: [
        '*',
        [
          sequelize.fn('SUM', sequelize.col('UserModules.duration')),
          'totalDuration',
        ],
      ],
    })

    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data,
      totalDuration: data.totalDuration,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getUserCourse = async (req, res, next) => {
  const { id } = req.params
  try {
    const data = await UserCourse.findAll({
      where: { id },
      include: [
        {
          model: UserModule,
          include: [
            {
              model: UserVideo,
            },
          ],
        },
      ],
    })
    const userIds = data.map((userCourse) => userCourse.userId)
    const userId = req.user.id
    if (!userIds.includes(userId)) {
      return next(
        new ApiError(
          'You do not have access to this course because it is not yours',
          403,
        ),
      )
    }

    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  enrollCourse,
  getUserCourses,
  getUserCourse,
}
