const { Video, Module } = require("../models")

const createVid = async (req, res) => {
  const { title, videoUrl, duration, moduleId } = req.body
  try {
    let idModule
    if (moduleId) {
      const module = await Module.findOne({ where: { id: moduleId } })
      if (!module) {
        return res.status(400).json({
          status: `Bad request / cause module with id ${moduleId} not found`
        })
      }
      idModule = module.id
    }

    const newVid = await Video.create({
      title,
      videoUrl,
      duration,
      moduleId: idModule
    })
    res.status(200).json({
      status: "Success, create video",
      data: {
        newVid
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

const getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll()
    res.status(200).json({
      status: "Success, fetch",
      data: {
        videos
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

const deleteVideo = async (req, res) => {
  const { id } = req.params
  try {
    await Video.destroy({ where: { id } })
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

const updateVideo = async (req, res) => {
  const { id } = req.params
  const { title, videoUrl, moduleId } = req.body
  try {
    let idModule
    if (moduleId) {
      const module = await Module.findOne({ where: { id: moduleId } })
      if (!module) {
        return res.status(400).json({
          status: `Bad request / cause module with id ${moduleId} not found`
        })
      }
      idModule = module.id
    }

    const updatedVideo = await Video.update(
      {
        title,
        videoUrl,
        moduleId: idModule
      },
      { where: { id }, returning: true }
    )
    res.status(200).json({
      status: "Success, updated",
      data: {
        updatedVideo
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

const getVideo = async (req, res) => {
  const { id } = req.params
  try {
    const video = await Video.findOne({ where: { id } })
    res.status(200).json({
      status: "Success, fetch",
      data: {
        video
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

module.exports = {
  createVid,
  getVideos,
  deleteVideo,
  updateVideo,
  getVideo
}
