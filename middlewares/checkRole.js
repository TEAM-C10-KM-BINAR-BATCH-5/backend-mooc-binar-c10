const ApiError = require("../utils/apiError")

const checkRole = (roles) => {
	return async (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ApiError(
					`kamu bukan ${roles.toString()} jadi tidak bisa akses`,
					401
				)
			)
		}
		next()
	}
}

module.exports = checkRole
