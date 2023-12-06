const { User, Auth } = require('../models')
const ApiError = require('../utils/apiError')
const imagekit = require('../lib/imageKit')

const findUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: ['Auth'],
    })

    res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data: {
        users,
      },
    })
  } catch (err) {
    next(new ApiError(err.message, 400))
  }
}

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: ['Auth'],
    })

    res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data: {
        user,
      },
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
    await User.update(
      {
        name,
        country,
        city,
        profileUrl: image,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    )

    await Auth.update(
      {
        email,
        phoneNumber,
      },
      { where: { id: authId } },
    )

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
