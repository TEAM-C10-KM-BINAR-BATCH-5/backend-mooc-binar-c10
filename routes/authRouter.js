const router = require("express").Router()

const Auth = require("../controllers/authController")
const checkOtp = require("../middlewares/checkOtp")

router.post("/register", checkOtp(), Auth.register)
router.post("/login", Auth.login)

module.exports = router
