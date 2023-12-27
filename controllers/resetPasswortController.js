const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const otpTool = require('otp-without-db')
const { Auth, Notification, User } = require('../models')
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

    const key = process.env.OTP_SECRET

    await transporter.sendMail({
      from: '"Learn Hub" <binar.team.c10@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'OTP Verifikasi Reset Password', // Subject line
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
      <hr style="border:none;border-top:1px solid #eee" />
        <p style="font-size:1.1em">Hi,</p>
        <p>Terima kasih telah menggunakan Learn Hub. Gunakan OTP berikut untuk menyelesaikan proses reset password anda. OTP berlaku selama 5 menit</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 8px;">${otp}</h2>
        <p style="font-size:0.9em;">Learn Hub</p>
        <hr style="border:none;border-top:1px solid #eee" />
      </div>
    </div>`,
    })

    const hash = otpTool.createNewOTP(req.body.email, otp, key)
    return res.status(200).json({
      success: true,
      message: 'Success, sent',
      data: hash,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body
    if (!email || !otp || !password) {
      return next(new ApiError('email, otp, and password required', 400))
    }
    const user = await Auth.findOne({
      where: { email },
      include: [
        {
          model: User,
        },
      ],
    })
    if (!user) {
      return next(
        new ApiError(
          'Email not registered!, Please input email that you use for register!',
          404,
        ),
      )
    }
    const passwordLength = password.length < 8
    if (passwordLength) {
      return next(new ApiError('Minimum password must be 8 character', 400))
    }

    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    const resetedPassword = await Auth.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          email,
        },
      },
    )
    if (resetedPassword) {
      await Notification.create({
        title: 'Reseting Password',
        description:
          'Your password is successfully reseted!, please remember the password carefully',
        isRead: false,
        userId: user.User.id,
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Reseting your password successfully',
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  sendOtpForgotPassword,
  resetPassword,
}
