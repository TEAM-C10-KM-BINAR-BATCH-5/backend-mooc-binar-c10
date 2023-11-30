const ApiError = require("../utils/apiError")

const checkRole = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(`You are not ${roles.toString()}, your access to this is blocked`, 401)
      )
    }
    next()
  }
}

module.exports = checkRole
