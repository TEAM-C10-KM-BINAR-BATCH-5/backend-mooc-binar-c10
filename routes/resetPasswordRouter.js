const router = require('express').Router()
const resetPasswordController = require('../controllers/resetPasswortController')
const checkOtp = require('../middlewares/checkOtp')

router.post('/otp', resetPasswordController.sendOtpForgotPassword)
router.post('/verify', checkOtp(), resetPasswordController.resetPassword)

module.exports = router
