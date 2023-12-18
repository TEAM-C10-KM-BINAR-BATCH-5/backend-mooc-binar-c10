const { User, Course } = require('../models')
const ApiError = require('../utils/apiError')

const getDataDashboard = async (req, res, next) => {
  try {
    const activeUsers = User.count({
      where: {
        role: 'user',
      },
    })
    const premiumClasses = Course.count({
      where: {
        courseType: 'Premium',
      },
    })

    const activeClasses = Course.count()

    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data: {
        activeUsers,
        activeClasses,
        premiumClasses,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  getDataDashboard,
}
