const ApiError = require('../utils/apiError')

const checkId = (db) => async (req, res, next) => {
  try {
    const find = await db.findByPk(req.params.id)
    if (!find) {
      return next(new ApiError('id does not exist', 404))
    }
    return next()
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

module.exports = checkId
