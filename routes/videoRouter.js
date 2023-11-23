const router = require("express").Router()
const videoController = require("../controllers/videoController")

const checkId = require("../middlewares/checkId")

const { Video } = require("../models")

router.route("/").post(videoController.createVid).get(videoController.getVideos)
router
  .route("/:id")
  .delete(checkId(Video), videoController.deleteVideo)
  .put(checkId(Video), videoController.updateVideo)
  .get(checkId(Video), videoController.getVideo)

module.exports = router
