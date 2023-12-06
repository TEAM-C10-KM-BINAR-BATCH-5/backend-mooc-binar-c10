const multer = require('multer')
const ApiError = require('../utils/apiError')

const multerFiltering = (req, file, cb) => {
  // prettier-ignore
  if (
    file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'
  ) {
    return cb(null, true)
  }
  return cb(new ApiError('Wrong image format', 400))
}

const upload = multer({
  fileFilter: multerFiltering,
})
module.exports = upload
