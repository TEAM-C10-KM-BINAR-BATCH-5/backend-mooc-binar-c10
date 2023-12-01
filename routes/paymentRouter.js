const router = require("express").Router()

const { Course } = require("../models")
const payment = require("../controllers/paymentController")
const authenticate = require("../middlewares/authenticate")
const checkRole = require("../middlewares/checkRole")
const checkId = require("../middlewares/checkId")

router.post("/:id", authenticate, checkRole("user"), checkId(Course), payment.buyCourse)
router.post("/", payment.paymentHook)

module.exports = router
