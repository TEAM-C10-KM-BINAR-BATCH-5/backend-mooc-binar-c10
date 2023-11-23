const router = require("express").Router()
const courseController = require("../controllers/courseController")
const { Course } = require("../models")
const upload = require("../middlewares/uploader")
const checkId = require("../middlewares/checkId")

router
  .route("/")
  .post(upload.single("image"), courseController.createCourse)
  .get(courseController.getCourses)

router
  .route("/:id")
  .delete(checkId(Course), courseController.deleteCourse)
  .get(checkId(Course), courseController.getCourse)
  .put(checkId(Course), courseController.updateCourse)

module.exports = router
