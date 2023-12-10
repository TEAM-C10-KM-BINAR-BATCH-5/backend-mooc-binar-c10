const router = require('express').Router()
const notificationController = require('../controllers/notificationController')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')
const checkId = require('../middlewares/checkId')

const { Notification } = require('../models')

// admin create notif for all users
router.post(
  '/',
  authenticate,
  checkRole('admin'),
  notificationController.createNotificationToAllUsers,
)
// admin create notif for spesific user by id
router.post(
  '/:id',
  authenticate,
  checkRole('admin'),
  notificationController.createNotificationToSpesificUser,
)
// admin get all notif
router.get(
  '/',
  authenticate,
  checkRole('admin'),
  notificationController.getAllNotification,
)

// user delete their notif and admin can delete every notif
router.delete(
  '/my/:id',
  authenticate,
  checkId(Notification),
  notificationController.deleteNotification,
)

// user mendapatkan notif mereka
router.get(
  '/my',
  authenticate,
  checkRole('user'),
  notificationController.getMyNotification,
)

// user mark notif as read by id
router.patch(
  '/my/markasread/:id',
  authenticate,
  checkId(Notification),
  notificationController.markNotificationAsRead,
)

// user mark all notif as read
router.patch(
  '/my/markallasread',
  authenticate,
  notificationController.markAllNotificationAsRead,
)

module.exports = router
