const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Auth, User, Notification } = require('../models')
const ApiError = require('../utils/apiError')
const imagekit = require('../lib/imageKit')

const register = async (req, res, next) => {
  try {
    // prettier-ignore
    const {
      name, email, password, phoneNumber,
    } = req.body

    // validasi untuk check apakah email nya udah ada
    const user = await Auth.findOne({
      where: {
        email,
      },
    })

    if (user) {
      return next(new ApiError('User email already taken', 400))
    }

    // prettier-ignore
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    // Test the email against the regular expression
    if (!emailRegex.test(email)) {
      return next(new ApiError('Please enter a valid email address', 400))
    }

    // minimum password length
    const passwordLength = password.length < 8
    if (passwordLength) {
      return next(new ApiError('Minimum password must be 8 character', 400))
    }
    // validate phone number
    const phoneRegex = /^(?:\+62|62|0)[2-9]\d{7,11}$/

    // Test the phone number against the regular expression
    if (!phoneRegex.test(phoneNumber)) {
      // Phone number is invalid
      return next(new ApiError('Please enter a valid phone number', 400))
    }

    // hashing password
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const newUser = await User.create({
      name,
      role: 'user',
      membership: 'free',
    })

    await Auth.create({
      email,
      password: hashedPassword,
      phoneNumber,
      userId: newUser.id,
    })

    return res.status(201).json({
      success: true,
      message: 'Success, register user',
      data: {
        ...newUser,
        phoneNumber,
        email,
        password: hashedPassword,
      },
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return next(new ApiError('Email and password are requred for login', 400))
    }
    const auth = await Auth.findOne({
      where: { email },
      include: [
        {
          model: User,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    })
    if (!auth) {
      return next(new ApiError('Email does not exist, register instead', 401))
    }

    if (auth.User.role === 'admin') {
      return next(new ApiError('This only accept register for user only', 400))
    }
    const comparePassword = await bcrypt.compare(password, auth.password)
    if (comparePassword === false) {
      return next(new ApiError("Password doesn't match", 400))
    }

    const token = jwt.sign(
      {
        id: auth.User.id,
        name: auth.User.name,
        email: auth.email,
        role: auth.User.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIREDIN },
    )
    return res.status(200).json({
      success: true,
      message: 'Success, login user',
      token,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const profile = async (req, res, next) => {
  try {
    const data = {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
      country: req.user.country,
      city: req.user.city,
      membership: req.user.membership,
      profileUrl: req.user.profileUrl,
      phoneNumber: req.user.Auth.phoneNumber,
      email: req.user.Auth.email,
    }
    return res.status(200).json({
      success: true,
      message: 'Success',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateAccount = async (req, res, next) => {
  // prettier-ignore
  const {
    name, country, city, email, phoneNumber,
  } = req.body

  const { file } = req
  let image
  try {
    if (file) {
      const split = file.originalname.split('.')
      const extension = split[split.length - 1]

      const img = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      image = img.url
    }
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [{ model: Auth }],
    })
    const authId = user.Auth.id
    if (name) {
      await User.update(
        {
          name,
        },
        {
          where: {
            id: req.user.id,
          },
        },
      )
    }
    if (country) {
      await User.update(
        {
          country,
        },
        {
          where: {
            id: req.user.id,
          },
        },
      )
    }
    if (city) {
      await User.update(
        {
          city,
        },
        {
          where: {
            id: req.user.id,
          },
        },
      )
    }
    await User.update(
      {
        profileUrl: image,
      },
      {
        where: {
          id: req.user.id,
        },
      },
    )

    if (email) {
      await Auth.update(
        {
          email,
        },
        { where: { id: authId } },
      )
    }
    if (phoneNumber) {
      await Auth.update(
        {
          phoneNumber,
        },
        { where: { id: authId } },
      )
    }

    res.status(200).json({
      success: true,
      message: 'Success, updated',
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const ubahPassword = async (req, res, next) => {
  const { oldPassword, newPassword, repeatNewPassword } = req.body
  try {
    const auth = await Auth.findOne({
      where: { userId: req.user.id },
    })
    const comparePassword = await bcrypt.compare(oldPassword, auth.password)
    if (comparePassword === false) {
      return next(
        new ApiError(
          'Your old password is not match with this account, if you forgot the password, go to reset the password feature',
          400,
        ),
      )
    }
    const passwordLength = newPassword.length < 8
    if (passwordLength) {
      return next(new ApiError('Minimum password must be 8 character', 400))
    }
    if (newPassword !== repeatNewPassword) {
      return next(
        new ApiError(
          'New password must be the same with new repeating password',
          400,
        ),
      )
    }
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(newPassword, saltRounds)
    if (auth && comparePassword) {
      const updatedPassword = await Auth.update(
        {
          password: hashedPassword,
        },
        { where: { id: auth.id } },
      )
      if (updatedPassword) {
        await Notification.create({
          title: 'Password Changed',
          description:
            'Your password is successfully updated!, please remember the password carefully',
          isRead: false,
          userId: req.user.id,
        })
      }
    }
    return res.status(200).json({
      success: true,
      message: 'Success, your password successfully changed',
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return next(new ApiError('Email and password are requred for login', 400))
    }
    const auth = await Auth.findOne({
      where: { email },
      include: [
        {
          model: User,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    })
    if (!auth) {
      return next(new ApiError('Email does not exist, register instead', 401))
    }

    if (auth.User.role === 'user') {
      return next(new ApiError('This only accept register for admin only', 400))
    }
    const comparePassword = await bcrypt.compare(password, auth.password)
    if (comparePassword === false) {
      return next(new ApiError("Password doesn't match", 400))
    }

    const token = jwt.sign(
      {
        id: auth.User.id,
        name: auth.User.name,
        email: auth.email,
        role: auth.User.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIREDIN },
    )
    return res.status(200).json({
      success: true,
      message: 'Success, login admin',
      token,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  register,
  login,
  profile,
  updateAccount,
  ubahPassword,
  loginAdmin,
}
