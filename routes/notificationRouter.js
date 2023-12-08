const router = require('express').Router()
const notificationController = require('../controllers/notificationController')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

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
router.delete('/:id', authenticate, notificationController.deleteNotification)

// user mendapatkan notif mereke
router.get(
  '/my',
  authenticate,
  checkRole('user'),
  notificationController.getMyNotification,
)

module.exports = router
