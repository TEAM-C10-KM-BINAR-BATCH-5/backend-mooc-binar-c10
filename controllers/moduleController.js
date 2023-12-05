const { Module, Video, Course } = require("../models")
const ApiError = require("../utils/apiError")

const createModule = async (req, res, next) => {
  const { title, courseId } = req.body
  try {
    let idCourse
    if (courseId) {
      const course = await Course.findOne({ where: { id: courseId } })
      if (!course) {
        return next(new ApiError(`Cause course with id ${courseId} not found`, 404))
      }
      idCourse = course.id
    }
    const newModule = await Module.create({
      title,
      duration: 0,
      courseId: idCourse
    })
    if (newModule) {
      const course = await Course.findOne({ where: { id: courseId } })
      let totalModule = course.moduleCount
      await Course.update(
        {
          moduleCount: ++totalModule
        },
        { where: { id: idCourse } }
      )
    }

    res.status(201).json({
      success: true,
      message: "Success, create module",
      data: {
        newModule
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getModules = async (req, res, next) => {
  try {
    const modules = await Module.findAll({
      include: [{ model: Video, attributes: { exclude: ["createdAt", "updatedAt"] } }]
    })
    res.status(200).json({
      success: true,
      message: "Success, fetch",
      data: {
        modules
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const deleteModule = async (req, res, next) => {
  const { id } = req.params
  try {
    const module = await Module.findOne({
      where: { id }
    })
    const idCourse = module.courseId
    const course = await Course.findOne({ where: { id: idCourse } })
    let decrementModuleCount = course.moduleCount
    const deletedModule = await Module.destroy({ where: { id } })
    if (deletedModule) {
      await Course.update(
        {
          moduleCount: --decrementModuleCount
        },
        { where: { id: idCourse } }
      )
    }
    res.status(200).json({
      success: true,
      message: "Success, deleted",
      data: null
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateModule = async (req, res, next) => {
  const { id } = req.params
  const { title, duration, courseId } = req.body
  try {
    let idCourse
    if (courseId) {
      const course = await Course.findOne({ where: { id: courseId } })
      if (!course) {
        return next(new ApiError(`Cause course with id ${courseId} not found`, 404))
      }
      idCourse = course.id
    }
    const updatedModule = await Module.update(
      {
        title,
        duration,
        courseId: idCourse
      },
      { where: { id }, returning: true }
    )

    res.status(200).json({
      success: true,
      message: "Success, updated",
      data: {
        updatedModule
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getModule = async (req, res, next) => {
  const { id } = req.params
  try {
    const module = await Module.findOne({
      where: { id },
      include: [{ model: Video }]
    })
    res.status(200).json({
      success: true,
      message: "Success, fetch",
      data: {
        module
      }
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  createModule,
  getModules,
  deleteModule,
  updateModule,
  getModule
}
