const { Video, Module } = require("../models")
const ApiError = require("../utils/apiError")

const createVid = async (req, res, next) => {
	const { title, videoUrl, duration, moduleId } = req.body
	try {
		let idModule
		if (moduleId) {
			const module = await Module.findOne({ where: { id: moduleId } })
			if (!module) {
				return next(
					new ApiError(
						`Bad request / cause module with id ${moduleId} not found`,
						400
					)
				)
			}
			idModule = module.id
		}

		const newVid = await Video.create({
			title,
			videoUrl,
			duration,
			moduleId: idModule,
		})
		res.status(200).json({
			success: true,
			message: "Success, create video",
			data: {
				newVid,
			},
		})
	} catch (error) {
		return next(new ApiError(error.message, 500))
	}
}

const getVideos = async (req, res, next) => {
	try {
		const videos = await Video.findAll()
		res.status(200).json({
			success: true,
			message: "Success, fetch",
			data: {
				videos,
			},
		})
	} catch (error) {
		return next(new ApiError(error.message, 500))
	}
}

const deleteVideo = async (req, res, next) => {
	const { id } = req.params
	try {
		await Video.destroy({ where: { id } })
		res.status(200).json({
			success: true,
			message: "Success, deleted",
			data: null,
		})
	} catch (error) {
		return next(new ApiError(error.message, 500))
	}
}

const updateVideo = async (req, res, next) => {
	const { id } = req.params
	const { title, videoUrl, moduleId } = req.body
	try {
		let idModule
		if (moduleId) {
			const module = await Module.findOne({ where: { id: moduleId } })
			if (!module) {
				return next(
					new ApiError(
						`Bad request / cause module with id ${moduleId} not found`,
						400
					)
				)
			}
			idModule = module.id
		}

		const updatedVideo = await Video.update(
			{
				title,
				videoUrl,
				moduleId: idModule,
			},
			{ where: { id }, returning: true }
		)
		res.status(200).json({
			success: true,
			message: "Success, updated",
			data: {
				updatedVideo,
			},
		})
	} catch (error) {
		return next(new ApiError(error.message, 500))
	}
}

const getVideo = async (req, res, next) => {
	const { id } = req.params
	try {
		const video = await Video.findOne({ where: { id } })
		res.status(200).json({
			success: true,
			message: "Success, fetch",
			data: {
				video,
			},
		})
	} catch (error) {
		return next(new ApiError(error.message, 500))
	}
}

module.exports = {
	createVid,
	getVideos,
	deleteVideo,
	updateVideo,
	getVideo,
}
