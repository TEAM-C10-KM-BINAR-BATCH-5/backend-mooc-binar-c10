/* eslint-disable arrow-body-style */
const { Notification, User } = require('../models')
const ApiError = require('../utils/apiError')

// admin
const createNotificationToAllUsers = async (req, res, next) => {
  const { title, description } = req.body
  try {
    const users = await User.findAll()

    await Promise.all(
      users.map((user) => {
        return Notification.create({
          title,
          description,
          isRead: false,
          userId: user.id,
        })
      }),
    )

    res.status(201).json({
      success: true,
      message: 'Notification created and sent to all users',
    })
  } catch (error) {
    next(new ApiError(error.message, 500))
  }
}

// admin
const createNotificationToSpesificUser = async (req, res, next) => {
  const { title, description } = req.body
  try {
    const user = await User.findOne({ where: { id: req.params.id } })
    if (!user) {
      return next(new ApiError(`User with id ${req.params.id} not exist`, 404))
    }
    await Notification.create({
      title,
      description,
      isRead: false,
      userId: user.id,
    })
    return res.status(201).json({
      success: true,
      message: `Notification created and sent to user with id ${req.params.id}`,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

// user
const getMyNotification = async (req, res, next) => {
  try {
    const data = await Notification.findAll({
      where: { userId: req.user.id },
    })
    if (!data) {
      return next(new ApiError("You don't have any notitication yet", 404))
    }
    return res.status(200).json({
      success: true,
      message: 'Success, fetch notification',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

// admin
const getAllNotification = async (req, res, next) => {
  try {
    const data = await Notification.findAll({
      include: [{ model: User, attributes: ['id', 'name'] }],
    })
    return res.status(200).json({
      success: true,
      message: 'Success, fetch notification',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

// user & admin
const deleteNotification = async (req, res, next) => {
  try {
    const notif = await Notification.findOne({ where: { id: req.params.id } })
    if (notif.userId !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ApiError('You only have access to delete your notification', 400),
      )
    }
    await Notification.destroy({ where: { id: req.params.id } })
    return res.status(200).json({
      success: true,
      message: 'Success, notification deleted',
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

// const markNotificationAsRead = async(req,res,next)=>{
//   try {

//   } catch (error) {
//     return next(new ApiError(error.message, 500))
//   }
// }

module.exports = {
  createNotificationToAllUsers,
  getMyNotification,
  getAllNotification,
  deleteNotification,
  createNotificationToSpesificUser,
}
