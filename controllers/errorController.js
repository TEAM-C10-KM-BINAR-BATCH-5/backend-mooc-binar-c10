module.exports = (err, req, res) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500
  // eslint-disable-next-line no-param-reassign, no-self-assign
  err.message = err.message

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}
