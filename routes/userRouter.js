const router = require('express').Router()

const user = require('../controllers/userController')

const checkId = require('../middlewares/checkId')
const upload = require('../middlewares/uploader')

const { User } = require('../models')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

// user can access
router.get(
  '/:id',
  authenticate,
  checkRole('admin'),
  checkId(User),
  user.findUserById,
)
router.patch(
  '/:id',
  authenticate,
  checkRole('admin'),
  checkId(User),
  upload.single('image'),
  user.updateUser,
)

// admin can access
router.get('/', authenticate, checkRole('admin'), user.findUsers)

router.delete(
  '/:id',
  authenticate,
  checkRole('admin'),
  checkId(User),
  user.deleteUser,
)

module.exports = router
