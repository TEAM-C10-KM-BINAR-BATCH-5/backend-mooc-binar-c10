// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500
  // eslint-disable-next-line no-param-reassign, no-self-assign
  err.message = err.message

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}
