const { User, Course } = require('../models')
const ApiError = require('../utils/apiError')

const getDataDashboard = async (req, res, next) => {
  try {
    const activeUsers = await User.count({
      where: {
        role: 'user',
      },
    })
    const premiumClasses = await Course.count({
      where: {
        courseType: 'Premium',
      },
    })

    const activeClasses = await Course.count()

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
