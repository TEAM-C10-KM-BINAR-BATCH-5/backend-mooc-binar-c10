/* eslint-disable camelcase */
const uuidv4 = require('uuid').v4
const fetch = require('node-fetch')
const crypto = require('crypto')
const { Course, Payment, UserCourse } = require('../models')
const ApiError = require('../utils/apiError')

const buyCourse = async (req, res, next) => {
  const courseId = req.params.id

  try {
    const course = await Course.findOne({
      where: {
        id: courseId,
      },
    })

    const alreadyEnrolled = await UserCourse.create({
      userId: req.user.id,
      courseId,
    })

    if (alreadyEnrolled) {
      return next(new ApiError('Course already enrolled', 400))
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
  } catch (err) {
    return next(new ApiError(err.message, 400))
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
        userId: payment.userId,
        courseId: payment.courseId,
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Success completing payment',
    })
  } catch (err) {
    return next(new ApiError(err.message, 400))
  }
}

module.exports = {
  buyCourse,
  paymentHook,
}
