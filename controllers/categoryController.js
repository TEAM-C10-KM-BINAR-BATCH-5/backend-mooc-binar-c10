const { Category, Course } = require("../models")
const ApiError = require("../utils/apiError")

const createCategory = async (req, res, next) => {
  const { id, name } = req.body
  try {
    const newCategory = await Category.create({
      id,
      name
    })
    res.status(200).json({
      success: true,
      message: "Success, create category",
      data: {
        newCategory
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json({
      success: true,
      message: "Success, fetch",
      data: {
        categories
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const deleteCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    await Category.destroy({ where: { id } })
    res.status(200).json({
      success: true,
      message: "Success, deleted",
      data: null
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateCategory = async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const updatedCategory = await Category.update(
      {
        name
      },
      { where: { id }, returning: true }
    )
    res.status(200).json({
      success: true,
      message: "Success, updated",
      data: {
        updatedCategory
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const category = await Category.findOne({ where: { id }, include: [{ model: Course }] })
    res.status(200).json({
      success: true,
      message: "Success, fetch",
      data: {
        category
      }
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
  getCategory
}
