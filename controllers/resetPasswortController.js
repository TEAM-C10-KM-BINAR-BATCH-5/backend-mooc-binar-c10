const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const { Auth } = require('../models')
const ApiError = require('../utils/apiError')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 485,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
})

const sendOtpForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const Email = await Auth.findOne({
      where: {
        email,
      },
    })
    if (Email === null) {
      return next(
        new ApiError('Please input email that you use for register!', 400),
      )
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    await transporter.sendMail({
      from: '"Learn Hub" <binar.team.c10@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Email Verification OTP', // Subject line
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
      <hr style="border:none;border-top:1px solid #eee" />
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for using Learn Hub. Use the following OTP to complete your reset password. OTP is valid for 60 seconds</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 8px;">${otp}</h2>
        <p style="font-size:0.9em;">Learn Hub</p>
        <hr style="border:none;border-top:1px solid #eee" />
      </div>
    </div>`,
    })

    req.session.otp = otp

    return res.status(200).json({
      success: true,
      message: 'Success, sent',
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body
    if (!email || !otp || !password) {
      return next(new ApiError('email, otp, and password required', 400))
    }
    const user = await Auth.findOne({ where: { email } })
    if (!user) {
      return next(
        new ApiError('Please input email that you use for register!', 404),
      )
    }
    const passwordLength = password.length <= 8
    if (passwordLength) {
      return next(new ApiError('Minimum password must be 8 character', 400))
    }

    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    await Auth.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          email,
        },
      },
    )
    return res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

module.exports = {
  sendOtpForgotPassword,
  resetPassword,
}
