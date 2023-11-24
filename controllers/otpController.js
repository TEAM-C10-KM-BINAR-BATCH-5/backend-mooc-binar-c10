const ApiError = require("../utils/apiError");

const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const createOtp = async (req, res, next) => {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    await transporter.sendMail({
      from: '"arfiano" <arfianoj@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "OTP", // Subject line
      text: `Your OTP is: ${otp}`, // plain text body
      html: `<b>Your OTP is: ${otp}</b>`, // html body
    });

    req.session.otp = otp;

    return res.status(200).json({
      success: true,
      message: "Success, sent",
      data: otp,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createOtp,
};
