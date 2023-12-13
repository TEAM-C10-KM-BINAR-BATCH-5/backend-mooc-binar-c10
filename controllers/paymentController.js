/* eslint-disable camelcase */
const crypto = require('crypto')
// prettier-ignore
const {
  Payment, UserCourse, Notification, User,
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
    return next(new ApiError(error.message, 400))
  }
}

module.exports = {
  paymentHook,
}
