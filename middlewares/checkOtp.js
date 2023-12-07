const ApiError = require('../utils/apiError')

const checkOtp = () => async (req, res, next) => {
  try {
    if (!req.body.otp) {
      return next(new ApiError('Otp required!', 400))
    }
    if (`${req.body.otp}` !== req.session.otp) {
      return next(new ApiError('invalid or expired otp', 400))
    }
    return next()
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

module.exports = checkOtp
