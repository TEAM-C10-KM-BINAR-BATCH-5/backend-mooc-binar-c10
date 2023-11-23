const { Course, Module, Video } = require("../models")
const ApiError = require("../utils/apiError")

const createCourse = async (req, res, next) => {
  const {
    title,
    category,
    level,
    courseType,
    imageUrl,
    rating,
    instructor,
    duration,
    telegramLink,
    moduleCount,
    about,
    objective,
    price
  } = req.body
  try {
    const newCourse = await Course.create({
      title,
      about,
      objective,
      category,
      level,
      courseType,
      imageUrl,
      rating,
      instructor,
      duration,
      telegramLink,
      moduleCount,
      price
    })

    res.status(200).json({
      success: true,
      message: "Success, create course",
      data: {
        newCourse
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll()
    res.status(200).json({
      success: true,
      message: "Success, fetch",
      data: {
        courses
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const deleteCourse = async (req, res, next) => {
  const { id } = req.params
  try {
    await Course.destroy({ where: { id } })
    res.status(200).json({
      success: true,
      message: "Success, deleted",
      data: null
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getCourse = async (req, res, next) => {
  const { id } = req.params
  try {
    const course = await Course.findOne({
      where: { id },
      include: [
        {
          model: Module,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Video,
              attributes: { exclude: ["createdAt", "updatedAt"] }
            }
          ]
        }
      ]
    })
    res.status(200).json({
      success: true,
      message: "Success, fetch",
      data: {
        course
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateCourse = async (req, res, next) => {
  const { id } = req.params
  const {
    title,
    category,
    level,
    courseType,
    imageUrl,
    rating,
    instructor,
    duration,
    telegramLink,
    moduleCount,
    about,
    objective,
    price
  } = req.body
  try {
    const updatedCourse = await Course.update(
      {
        title,
        category,
        level,
        courseType,
        imageUrl,
        rating,
        instructor,
        duration,
        telegramLink,
        moduleCount,
        about,
        objective,
        price
      },
      { where: { id }, returning: true }
    )
    res.status(200).json({
      success: true,
      message: "Success, updated",
      data: {
        updatedCourse
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  createCourse,
  getCourses,
  deleteCourse,
  getCourse,
  updateCourse
}
