/* eslint-disable camelcase */
const { Op } = require('sequelize')
const uuidv4 = require('uuid').v4
const crypto = require('crypto')
const fetch = require('node-fetch')
// prettier-ignore
const {
  Payment, UserCourse, Notification, User, Course,
} = require('../models')
const ApiError = require('../utils/apiError')

const buyCourse = async (req, res, next) => {
  const courseId = req.params.id

  try {
    const course = await Course.findOne({
      where: {
        id: courseId,
      },
    })

    const alreadyPurchased = await Payment.findOne({
      userId: req.user.id,
      courseId,
      status: {
        [Op.in]: ['settlement', 'capture'],
      },
    })

    if (alreadyPurchased) {
      return next(new ApiError('Course already purchased', 400))
    }

    const alreadyEnrolled = await UserCourse.findOne({
      userId: req.user.id,
      courseId,
    })

    if (!alreadyEnrolled) {
      await UserCourse.create({
        userId: req.user.id,
        courseId,
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
    return next(new ApiError(error.message, 500))
  }
}

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
      await UserCourse.create({
        userId: payment[1].userId,
        courseId: payment[1].courseId,
      })

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
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  buyCourse,
  paymentHook,
}
