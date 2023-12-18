const { Module, Video, Course } = require('../models')
const ApiError = require('../utils/apiError')

const createModule = async (req, res, next) => {
  const { title, courseId, isLocked } = req.body
  try {
    let courseType
    let idCourse
    if (courseId) {
      const course = await Course.findOne({ where: { id: courseId } })
      if (!course) {
        return next(
          new ApiError(`Cause course with id ${courseId} not found`, 404),
        )
      }
      idCourse = course.id
      courseType = course.courseType
    }
    const data = await Module.create({
      title,
      duration: 0,
      courseId: idCourse,
      isLocked: courseType === 'Free' ? false : isLocked || false,
    })
    if (data) {
      const course = await Course.findOne({ where: { id: courseId } })
      // let totalModule = course.moduleCount
      await Course.update(
        {
          moduleCount: course.moduleCount + 1,
        },
        { where: { id: idCourse } },
      )
    }

    return res.status(201).json({
      success: true,
      message: 'Success, create module',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getModules = async (req, res, next) => {
  try {
    const data = await Module.findAll({
      include: [
        { model: Video, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      ],
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

const deleteModule = async (req, res, next) => {
  const { id } = req.params
  try {
    const module = await Module.findOne({
      where: { id },
    })
    const idCourse = module.courseId
    const course = await Course.findOne({ where: { id: idCourse } })
    // let decrementModuleCount = course.moduleCount
    const deletedModule = await Module.destroy({ where: { id } })
    if (deletedModule) {
      await Course.update(
        {
          moduleCount: course.moduleCount - 1,
        },
        { where: { id: idCourse } },
      )
    }
    return res.status(200).json({
      success: true,
      message: 'Success, deleted',
      data: null,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateModule = async (req, res, next) => {
  const { id } = req.params
  // prettier-ignore
  const {
    title,
    duration,
    courseId,
    isLocked,
  } = req.body
  try {
    let courseType
    let idCourse
    if (courseId) {
      const course = await Course.findOne({ where: { id: courseId } })
      if (!course) {
        return next(
          new ApiError(`Cause course with id ${courseId} not found`, 404),
        )
      }
      idCourse = course.id
      courseType = course.courseType
    }

    await Module.update(
      {
        title,
        duration,
        courseId: idCourse,
        isLocked: courseType === 'Free' ? false : isLocked || false,
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

const getModule = async (req, res, next) => {
  const { id } = req.params
  try {
    const data = await Module.findOne({
      where: { id },
      include: [{ model: Video }],
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

const getModulesByCourseId = async (req, res, next) => {
  const courseId = req.params.id
  try {
    const data = await Module.findAll({
      where: {
        courseId,
      },
      include: [
        { model: Video, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      ],
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
  createModule,
  getModules,
  deleteModule,
  updateModule,
  getModule,
  getModulesByCourseId,
}
