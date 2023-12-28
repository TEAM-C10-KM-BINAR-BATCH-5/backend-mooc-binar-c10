const router = require('express').Router()
const { Course } = require('../models')
const enrollment = require('../controllers/enrollmentController')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')
const checkId = require('../middlewares/checkId')
const authenticateCategory = require('../middlewares/authenticateCategory')

router
  .route('/')
  .get(authenticate, checkRole('user'), enrollment.getUserCourses)

router
  .route('/:id')
  .get(authenticateCategory, checkId(Course), enrollment.getUserCourseById)

router.post(
  '/:id',
  authenticate,
  checkRole('user'),
  checkId(Course),
  enrollment.enrollCourse,
)

module.exports = router
