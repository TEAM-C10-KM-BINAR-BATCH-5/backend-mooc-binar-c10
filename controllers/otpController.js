const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
// eslint-disable-next-line import/no-extraneous-dependencies
const otpTool = require('otp-without-db')
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
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    const key = process.env.OTP_SECRET

    await transporter.sendMail({
      from: '"Learn Hub" binar.team.c10@gmail.com',
      to: req.body.email,
      subject: 'OTP Verifikasi Email',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
      <hr style="border:none;border-top:1px solid #eee" />
        <p style="font-size:1.1em">Hi,</p>
        <p>Terima kasih telah menggunakan Learn Hub. Gunakan OTP berikut untuk menyelesaikan proses pendaftaran Anda. OTP berlaku selama 5 menit</p>
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

module.exports = {
  createOtp,
}
