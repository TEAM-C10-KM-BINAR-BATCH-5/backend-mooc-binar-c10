const router = require('express').Router()
const courseController = require('../controllers/courseController')
const { Course } = require('../models')
const upload = require('../middlewares/uploader')
const checkId = require('../middlewares/checkId')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

router
  .route('/')
  .post(
    authenticate,
    checkRole('admin'),
    upload.single('image'),
    courseController.createCourse,
  )
  .get(courseController.getCourses)

router
  .route('/:id')
  .delete(
    authenticate,
    checkRole('admin'),
    checkId(Course),
    courseController.deleteCourse,
  )
  .get(checkId(Course), courseController.getCourse)
  .patch(
    authenticate,
    checkRole('admin'),
    checkId(Course),
    upload.single('image'),
    courseController.updateCourse,
  )

module.exports = router
