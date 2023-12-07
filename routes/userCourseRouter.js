const router = require('express').Router()
const { Course } = require('../models')
const userCourse = require('../controllers/userCourseController')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')
const checkId = require('../middlewares/checkId')

router
  .route('/')
  .get(authenticate, checkRole('user'), userCourse.getUserCourses)

router
  .route('/:id')
  .get(
    authenticate,
    checkRole('user'),
    checkId(Course),
    userCourse.getUserCourse,
  )

module.exports = router
