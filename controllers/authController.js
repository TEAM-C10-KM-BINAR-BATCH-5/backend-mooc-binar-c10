const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Auth, User } = require("../models")
const ApiError = require("../utils/apiError")

const register = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body

    // validasi untuk check apakah email nya udah ada
    const user = await Auth.findOne({
      where: {
        email
      }
    })

    if (user) {
      return next(new ApiError("User email already taken", 400))
    }

    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    // Test the email against the regular expression
    if (!emailRegex.test(email)) {
      return next(new ApiError("Please enter a valid email address", 400))
    }

    // minimum password length
    const passwordLength = password <= 8
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 400))
    }
    // validate phone number
    const phoneRegex = /^(?:\+62|62|0)[2-9]\d{7,11}$/

    // Test the phone number against the regular expression
    if (!phoneRegex.test(phoneNumber)) {
      // Phone number is invalid
      return next(new ApiError("Please enter a valid phone number", 400))
    }

    // hashing password
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const newUser = await User.create({
      name,
      role: "user",
      membership: "free",
      profileUrl: "adadadadad"
    })

    await Auth.create({
      email,
      password: hashedPassword,
      phoneNumber,
      userId: newUser.id
    })

    res.status(200).json({
      success: true,
      message: "Success, register user",
      data: {
        ...newUser,
        phoneNumber,
        email,
        password: hashedPassword
      }
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return next(new ApiError("Email and password are requred for login", 400))
    }
    const auth = await Auth.findOne({
      where: { email },
      include: [
        {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt"] }
        }
      ]
    })
    if (!auth) {
      return next(new ApiError("Email does not exist, register instead", 401))
    }
    const comparePassword = await bcrypt.compare(password, auth.password)
    if (comparePassword === false) {
      return next(new ApiError("Password doesn't match", 400))
    }
    if (auth && comparePassword) {
      const token = jwt.sign(
        {
          user: auth
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIREDIN }
      )
      res.status(200).json({
        success: true,
        message: "Success, login user",
        token: token
      })
    }
  } catch (error) {
    next(new ApiError(error.message, 500))
  }
}

module.exports = {
  register,
  login
}
