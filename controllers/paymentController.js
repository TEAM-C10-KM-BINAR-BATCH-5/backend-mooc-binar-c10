/* eslint-disable camelcase */
const crypto = require('crypto')
// prettier-ignore
const {
  Payment, UserCourse, Notification, User, UserModule, UserVideo, Module, Video, Course,
} = require('../models')
const ApiError = require('../utils/apiError')

const paymentHook = async (req, res, next) => {
  const {
    signature_key,
    order_id,
    payment_type,
    gross_amount,
    status_code,
    transaction_status,
  } = req.body

  try {
    const verifySignature = crypto
      .createHash('sha512')
      .update(
        `${order_id}${status_code}${gross_amount}${process.env.MIDTRANS_SERVER_KEY}`,
      )
      .digest('hex')

    if (verifySignature !== signature_key) {
      return next(new ApiError('invalid signature key', 400))
    }
    if (!order_id) {
      return next(new ApiError('invalid order id', 400))
    }
    const payment = await Payment.update(
      {
        status: transaction_status,
        amount: Number(gross_amount),
        gross_amount: Number(gross_amount),
        payment_type,
      },
      {
        where: {
          id: order_id,
        },
        returning: true,
        plain: true,
      },
    )
    if (['capture', 'settlement'].includes(transaction_status)) {
      const course = await Course.findOne({
        where: {
          id: payment[1].courseId,
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

      const userCourse = await UserCourse.create({
        userId: payment[1].userId,
        courseId: payment[1].courseId,
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
        isLocked: false,
      })

      const modules = await Module.findAll({ where: { courseId: course.id } })

      // eslint-disable-next-line no-restricted-syntax
      for (const module of modules) {
        // eslint-disable-next-line no-await-in-loop
        const userModule = await UserModule.create({
          userId: payment[1].userId,
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
            userId: payment[1].userId,
            videoId: video.id,
            courseId: payment[1].courseId,
            title: video.title,
            no: video.no,
            videoUrl: video.videoUrl,
            duration: video.duration,
            userModuleId: userModule.id,
            isLocked: false,
          })
        }
      }

      await User.update(
        {
          membership: 'premium',
        },
        { where: { id: payment[1].userId } },
      )

      await Notification.create({
        title: 'Transaction Success',
        description:
          'Congratulations, your course purchase has been successful. Lets continue to study the course you purchased',
        isRead: false,
        userId: payment[1].userId,
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Success completing payment',
    })
  } catch (error) {
    return next(new ApiError(error.message, 400))
  }
}

module.exports = {
  paymentHook,
}
