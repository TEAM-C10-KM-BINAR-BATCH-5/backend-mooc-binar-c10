const ApiError = require("../utils/apiError")

const otpGenerator = require("otp-generator")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 485,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD
  }
})

const createOtp = async (req, res, next) => {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    })

    await transporter.sendMail({
      from: '"Learn Hub" <binar.team.c10@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Email Verification OTP", // Subject line
      html: `<b>Your OTP is: ${otp}</b>` // html body
    })

    req.session.otp = otp

    return res.status(200).json({
      success: true,
      message: "Success, sent",
      data: otp
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

module.exports = {
  createOtp
}
