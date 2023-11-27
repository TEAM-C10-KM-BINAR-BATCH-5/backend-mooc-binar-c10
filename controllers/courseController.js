const { Course, Module, Video, Category } = require("../models")
const ApiError = require("../utils/apiError")
const imagekit = require("../lib/imageKit")

const createCourse = async (req, res, next) => {
	const {
		title,
		categoryId,
		level,
		rating,
		instructor,
		telegramLink,
		about,
		objective,
		onboarding,
		price,
	} = req.body
	const file = req.file
	let image
	try {
		if (file) {
			const split = file.originalname.split(".")
			const extension = split[split.length - 1]

			const img = await imagekit.upload({
				file: file.buffer,
				fileName: `IMG-${Date.now()}.${extension}`,
			})
			image = img.url
		}
		const category = await Category.findOne({ where: { id: categoryId } })
		if (!category) {
			return next(
				new ApiError(`Cause category with id ${categoryId} not found`, 404)
			)
		}
		const idCategory = category.id
		const newCourse = await Course.create({
			title,
			about,
			objective,
			categoryId: idCategory,
			onboarding,
			level,
			courseType: price > 0 ? "Premium" : "Free",
			imageUrl: image,
			rating,
			instructor,
			duration: 0,
			telegramLink,
			moduleCount: 0,
			price,
		})

		res.status(200).json({
			success: true,
			message: "Success, create course",
			data: {
				newCourse,
			},
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
				courses,
			},
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
			data: null,
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
							attributes: { exclude: ["createdAt", "updatedAt"] },
						},
					],
				},
			],
		})
		res.status(200).json({
			success: true,
			message: "Success, fetch",
			data: {
				course,
			},
		})
	} catch (error) {
		return next(new ApiError(error.message, 500))
	}
}

const updateCourse = async (req, res, next) => {
	const { id } = req.params
	const {
		title,
		level,
		categoryId,
		courseType,
		imageUrl,
		rating,
		instructor,
		duration,
		telegramLink,
		moduleCount,
		about,
		objective,
		onboarding,
		price,
	} = req.body
	try {
		let idCategory
		if (categoryId) {
			const category = await Category.findOne({ where: { id: categoryId } })
			if (!category) {
				return next(
					new ApiError(`Cause course with id ${categoryId} not found`, 404)
				)
			}
			idCategory = category.id
		}
		const updatedCourse = await Course.update(
			{
				title,
				categoryId: idCategory,
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
				onboarding,
				price,
			},
			{ where: { id }, returning: true }
		)
		res.status(200).json({
			success: true,
			message: "Success, updated",
			data: {
				updatedCourse,
			},
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
	updateCourse,
}
