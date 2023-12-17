const { User, Auth } = require('../models')
const ApiError = require('../utils/apiError')
const imagekit = require('../lib/imageKit')

const findUsers = async (req, res, next) => {
  try {
    const data = await User.findAll({
      include: ['Auth'],
    })

    res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data,
    })
  } catch (err) {
    next(new ApiError(err.message, 400))
  }
}

const findUserById = async (req, res, next) => {
  try {
    const data = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: ['Auth'],
    })

    res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data,
    })
  } catch (err) {
    next(new ApiError(err.message, 400))
  }
}

const updateUser = async (req, res, next) => {
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
      where: { id: req.params.id },
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
            id: req.params.id,
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
            id: req.params.id,
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
            id: req.params.id,
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
          id: req.params.id,
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

    return res.status(200).json({
      success: true,
      message: 'Success, updated',
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await Auth.destroy({
      where: {
        userId: req.params.id,
      },
    })
    await User.destroy({
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json({
      success: true,
      message: 'Success, deleted',
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
}
