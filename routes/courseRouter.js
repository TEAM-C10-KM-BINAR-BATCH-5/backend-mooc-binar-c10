const router = require("express").Router()
const courseController = require("../controllers/courseController")

const checkId = require("../middlewares/checkId")

const { Course } = require("../models")

router.route("/").post(courseController.createCourse).get(courseController.getCourses)

router
  .route("/:id")
  .delete(checkId(Course), courseController.deleteCourse)
  .get(checkId(Course), courseController.getCourse)
  .put(checkId(Course), courseController.updateCourse)

module.exports = router
