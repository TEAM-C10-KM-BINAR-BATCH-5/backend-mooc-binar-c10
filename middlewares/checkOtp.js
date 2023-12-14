// eslint-disable-next-line import/no-extraneous-dependencies
const otpTool = require('otp-without-db')
const ApiError = require('../utils/apiError')

const checkOtp = () => async (req, res, next) => {
  try {
    const key = process.env.OTP_SECRET
    if (!req.body.otp) {
      return next(new ApiError('Otp required!', 400))
    }
    const verify = otpTool.verifyOTP(
      req.body.email,
      req.body.otp,
      req.body.hashedOtp,
      key,
    )
    if (!verify) {
      return next(new ApiError('invalid or expired otp', 400))
    }
    return next()
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

module.exports = checkOtp
