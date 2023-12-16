const router = require('express').Router()
const { Video } = require('../models')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')
const progress = require('../controllers/progressController')
const checkId = require('../middlewares/checkId')

router.post(
  '/:id',
  authenticate,
  checkRole('user'),
  checkId(Video),
  progress.updateProgress,
)

module.exports = router
