const router = require("express").Router()

const Auth = require("../controllers/authController")
const checkOtp = require("../middlewares/checkOtp")
const authenticate = require("../middlewares/authenticate")
const upload = require("../middlewares/uploader")

// user
router.post("/register", checkOtp(), Auth.register)
router.post("/login", Auth.login)
router.patch("/update-profile", authenticate, upload.single("image"), Auth.updateAccount)

// admin and user
router.get("/profile", authenticate, Auth.profile)

// admin
router.post("/admin/login", Auth.loginAdmin)

module.exports = router
