const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
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

const createOtp = async (req, res, next) => {
  // const learnhubLogo = ""
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    await transporter.sendMail({
      from: '"Learn Hub" binar.team.c10@gmail.com',
      to: req.body.email,
      subject: 'Email Verification OTP',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
      <hr style="border:none;border-top:1px solid #eee" />
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for using Learn Hub. Use the following OTP to complete your register process. OTP is valid for 60 seconds</p>
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

module.exports = {
  createOtp,
}
