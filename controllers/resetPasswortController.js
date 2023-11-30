const bcrypt = require("bcrypt")
const { Auth } = require("../models")
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

const sendOtpForgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email
    const Email = await Auth.findOne({
      where: {
        email
      }
    })
    if (Email === null) {
      return next(new ApiError(`Please input email that you use for register!`, 400))
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    })
    await transporter.sendMail({
      from: '"Learn Hub" <binar.team.c10@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Email Verification OTP", // Subject line
      html: `<b>Your OTP for reset password is: ${otp}</b>` // html body
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

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body
    if (!email || !otp || !password) {
      return next(new ApiError("email, otp, and password required", 400))
    }
    const user = await Auth.findOne({ where: { email } })
    if (!user) {
      return next(new ApiError(`Please input email that you use for register!`, 404))
    }
    const passwordLength = password <= 8
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 400))
    }

    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    await Auth.update(
      {
        password: hashedPassword
      },
      {
        where: {
          email
        }
      }
    )
    res.status(200).json({
      success: true,
      message: `Password changed successfully`
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

module.exports = {
  sendOtpForgotPassword,
  resetPassword
}
