const uuidv4 = require("uuid").v4
const { Course, Payment } = require("../models")
const ApiError = require("../utils/apiError")
const fetch = require("node-fetch")
const crypto = require("crypto")

const buyCourse = async (req, res, next) => {
	const courseId = req.params.id

	try {
		const course = await Course.findOne({
			where: {
				id: courseId,
			},
		})

		const orderId = uuidv4()

		const dataTransaction = {
			transaction_details: {
				order_id: orderId,
				gross_amount: course.price,
			},
			customer_details: {
				first_name: req.user.name,
				email: req.user.email,
			},
		}

		const transaction = await fetch(process.env.MIDTRANS_SERVER_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Basic ${process.env.MIDTRANS_SERVER_KEY_HASHED}`,
			},
			body: JSON.stringify(dataTransaction),
		})

		const { redirect_url } = await transaction.json()

		await Payment.create({
			id: orderId,
			courseId,
			userId: req.user.id,
			payment_type: "midtrans",
			status: "pending",
			amount: course.price,
			gross_amount: course.price,
			date: new Date(),
		})

		res.status(200).json({
			success: true,
			message: "Success initiating payment",
			data: {
				redirect_url,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const paymentHook = async (req, res, next) => {
	const {
		signature_key,
		order_id,
		payment_type,
		gross_amount,
		status_code,
		transaction_status,
	} = req.body

	try {
		const verifySignature = crypto
			.createHash("sha512")
			.update(
				`${order_id}${status_code}${gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
			)
			.digest("hex")

		if (verifySignature !== signature_key) {
			return next(new ApiError("invalid signature key", 400))
		}
		if (!order_id) {
			return next(new ApiError("invalid order id", 400))
		}
		await Payment.update(
			{
				payment_type: "midtrans",
				status: transaction_status,
				amount: Number(gross_amount),
				gross_amount: Number(gross_amount),
				payment_type,
			},
			{
				where: {
					id: order_id,
				},
			}
		)
		res.status(200).json({
			success: true,
			message: "Success completing payment",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

module.exports = {
	buyCourse,
	paymentHook,
}
