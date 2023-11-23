const setHeaders = (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type")
	next()
}

module.exports = setHeaders
