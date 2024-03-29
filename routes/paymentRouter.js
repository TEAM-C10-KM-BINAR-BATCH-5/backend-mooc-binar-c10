const router = require('express').Router()
const { Course } = require('../models')
const payment = require('../controllers/paymentController')
const authenticate = require('../middlewares/authenticate')
const checkId = require('../middlewares/checkId')
const checkRole = require('../middlewares/checkRole')

router.post(
  '/:id',
  authenticate,
  checkRole('user'),
  checkId(Course),
  payment.buyCourse,
)

router.post('/', payment.paymentHook)

module.exports = router
