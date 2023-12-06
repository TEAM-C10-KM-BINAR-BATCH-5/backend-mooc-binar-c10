module.exports = (err, req, res) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}
