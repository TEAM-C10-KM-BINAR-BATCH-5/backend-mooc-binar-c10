const jwt = require('jsonwebtoken')
const { User, Auth } = require('../models')
const ApiError = require('../utils/apiError')
const checkRole = require('./checkRole')

module.exports = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      console.log('MASUK SINI GAK')
      const bearerToken = req.headers.authorization

      if (!bearerToken) {
        return next(new ApiError('No token', 401))
      }

      const token = bearerToken.split('Bearer ')[1]

      const payload = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findByPk(payload.id, {
        include: [{ model: Auth }],
      })

      if (!user) {
        return next(new ApiError('User with this token is not found', 404))
      }

      req.user = user
      checkRole('user')
      return next()
    }
    return next()
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}
