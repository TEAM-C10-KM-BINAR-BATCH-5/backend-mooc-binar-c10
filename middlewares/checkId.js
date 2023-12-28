const ApiError = require('../utils/apiError')

const checkId = (db) => async (req, res, next) => {
  try {
    console.log('MASOEKK middleware')

    const find = await db.findByPk(req.params.id)
    if (!find) {
      return next(new ApiError('id does not exist', 404))
    }
    return next()
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = checkId
