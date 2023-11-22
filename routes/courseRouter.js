const router = require("express").Router()
const courseController = require("../controllers/courseController")

router.route("/").post(courseController.createCourse).get(courseController.getCourses)

router.route("/:id").delete(courseController.deleteCourse)

module.exports = router
