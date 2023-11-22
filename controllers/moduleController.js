const { Module, Video, Course } = require("../models")

const createModule = async (req, res) => {
	const { title, duration, courseId } = req.body
	try {
		let idCourse
		if (courseId) {
			const course = await Course.findOne({ where: { id: courseId } })
			if (!course) {
				return res.status(400).json({
					success: false,
					message: `Bad request / cause course with id ${courseId} not found`,
				})
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
		res.status(500).json({
			success: false,
			message: error.message,
		})
		console.log(error.message)
	}
}

const getModules = async (req, res) => {
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
		res.status(500).json({
			success: false,
			message: error.message,
		})
		console.log(error.message)
	}
}

const deleteModule = async (req, res) => {
	const { id } = req.params
	try {
		await Module.destroy({ where: { id } })
		res.status(200).json({
			success: true,
			message: "Success, deleted",
			data: null,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
		console.log(error.message)
	}
}

const updateModule = async (req, res) => {
	const { id } = req.params
	const { title, duration, courseId } = req.body
	try {
		let idCourse
		if (courseId) {
			const course = await Course.findOne({ where: { id: courseId } })
			if (!course) {
				return res.status(400).json({
					success: false,
					message: `Bad request / cause course with id ${courseId} not found`,
				})
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
		res.status(500).json({
			success: false,
			message: error.message,
		})
		console.log(error.message)
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
		res.status(500).json({
			success: false,
			message: error.message,
		})
		console.log(error.message)
	}
}

module.exports = {
	createModule,
	getModules,
	deleteModule,
	updateModule,
	getModule,
}
