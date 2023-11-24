const router = require("express").Router();

const otp = require("../controllers/otpController");

router.post("/", otp.createOtp);

module.exports = router;
