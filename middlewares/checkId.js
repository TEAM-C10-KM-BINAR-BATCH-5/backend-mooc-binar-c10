const ApiError = require("../utils/apiError")

const checkId = (db) => {
  return async (req, res, next) => {
    try {
      const find = await db.findByPk(req.params.id)
      if (!find) {
        next(new ApiError(`id does not exist`, 404))
      }
      next()
    } catch (err) {
      next(new ApiError(err.message, 500))
    }
  }
}

module.exports = checkId
