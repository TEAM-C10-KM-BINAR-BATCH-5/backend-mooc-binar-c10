const ApiError = require("../utils/apiError");

const checkOtp = () => {
  return async (req, res, next) => {
    try {
      if (req.body.otp != req.session.otp) {
        next(new ApiError(`invalid otp`, 400));
      }
      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkOtp;
