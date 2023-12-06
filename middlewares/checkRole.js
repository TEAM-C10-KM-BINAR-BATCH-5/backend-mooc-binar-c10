const ApiError = require('../utils/apiError')

const checkRole = (roles) => async (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ApiError(
        `You are not ${roles.toString()}, your access to this is blocked`,
        401,
      ),
    )
  }
  return next()
}

module.exports = checkRole
