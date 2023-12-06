const router = require('express').Router()
const videoController = require('../controllers/videoController')

const checkId = require('../middlewares/checkId')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

const { Video } = require('../models')

router
  .route('/')
  .post(authenticate, checkRole('admin'), videoController.createVid)
  .get(videoController.getVideos)
router
  .route('/:id')
  .delete(
    authenticate,
    checkRole('admin'),
    checkId(Video),
    videoController.deleteVideo,
  )
  .put(
    authenticate,
    checkRole('admin'),
    checkId(Video),
    videoController.updateVideo,
  )
  .get(checkId(Video), videoController.getVideo)

module.exports = router
