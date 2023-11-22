const { Course, Module, Video } = require("../models")

const createCourse = async (req, res) => {
  const {
    title,
    category,
    level,
    courseType,
    imageUrl,
    trailerUrl,
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
      trailerUrl,
      rating,
      instructor,
      duration,
      telegramLink,
      moduleCount,
      price
    })

    res.status(200).json({
      status: "Success, create course",
      data: {
        newCourse
      }
    })
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message
    })
    console.log(error.message)
  }
}

const getCourses = async (req, res) => {
  try {
    const coursesData = await Course.findAll({
      include: [
        {
          model: Module,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [{ model: Video, attributes: { exclude: ["createdAt", "updatedAt"] } }]
        }
      ]
    })
    res.status(200).json({
      status: "Success, fetch",
      courses: coursesData
    })
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message
    })
    console.log(error.message)
  }
}

const deleteCourse = async (req, res) => {
  const { id } = req.params
  try {
    await Course.destroy({ where: { id } })
    res.status(200).json({
      status: "Success, deleted",
      data: null
    })
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message
    })
    console.log(error.message)
  }
}

// const updateVideo = async(req,res)=>{

// }

module.exports = {
  createCourse,
  getCourses,
  deleteCourse
}
