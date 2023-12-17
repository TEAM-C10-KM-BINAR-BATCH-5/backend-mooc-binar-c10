const { Category, Course } = require('../models')
const ApiError = require('../utils/apiError')
const imagekit = require('../lib/imageKit')

const createCategory = async (req, res, next) => {
  const { id, name } = req.body
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
    const data = await Category.create({
      id,
      name,
      imageUrl: image,
    })
    return res.status(201).json({
      success: true,
      message: 'Success, create category',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getCategories = async (req, res, next) => {
  try {
    const data = await Category.findAll()
    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const deleteCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    await Category.destroy({ where: { id } })
    return res.status(200).json({
      success: true,
      message: 'Success, deleted',
      data: null,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateCategory = async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body
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
    await Category.update(
      {
        name,
      },
      { where: { id } },
    )
    await Category.update(
      {
        imageUrl: image,
      },
      { where: { id } },
    )
    return res.status(200).json({
      success: true,
      message: 'Success, updated',
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const data = await Category.findOne({
      where: { id },
      include: [{ model: Course }],
    })
    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategory,
}
