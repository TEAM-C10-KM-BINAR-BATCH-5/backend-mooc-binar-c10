const { Module, Video, Course } = require("../models")
const ApiError = require("../utils/apiError")

const createModule = async (req, res, next) => {
	const { title, duration, courseId } = req.body
	try {
		let idCourse
		if (courseId) {
			const course = await Course.findOne({ where: { id: courseId } })
			if (!course) {
				return next(
					new ApiError(
						`Bad request / cause course with id ${courseId} not found`,
						400
					)
				)
			}
			idCourse = course.id
		}
		const newModule = await Module.create({
			title,
			duration,
			courseId: idCourse,
		})

		res.status(200).json({
			success: true,
			message: "Success, create module",
			data: {
				newModule,
			},
		})
	} catch (error) {
		return next(new ApiError(error.message, 500))
	}
}

const getModules = async (req, res, next) => {
	try {
		const modules = await Module.findAll({
			include: [
				{ model: Video, attributes: { exclude: ["createdAt", "updatedAt"] } },
			],
		})
		res.status(200).json({
			success: true,
			message: "Success, fetch",
			data: {
				modules,
			},
		})
	} catch (error) {
		return next(new ApiError(error.message, 500))
	}
}

const deleteModule = async (req, res, next) => {
	const { id } = req.params
	try {
		await Module.destroy({ where: { id } })
		res.status(200).json({
			success: true,
			message: "Success, deleted",
			data: null,
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
				return next(
					new ApiError(
						`Bad request / cause course with id ${courseId} not found`,
						400
					)
				)
			}
			idCourse = course.id
		}
		const updatedModule = await Module.update(
			{
				title,
				duration,
				courseId: idCourse,
			},
			{ where: { id }, returning: true }
		)

		res.status(200).json({
			success: true,
			message: "Success, updated",
			data: {
				updatedModule,
			},
		})
	} catch (error) {
		return next(new ApiError(error.message, 500))
	}
}

const getModule = async (req, res) => {
	const { id } = req.params
	try {
		const module = await Module.findOne({
			where: { id },
			include: [{ model: Video }],
		})
		res.status(200).json({
			success: true,
			message: "Success, fetch",
			data: {
				module,
			},
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
}
