const router = require("express").Router()
const videoController = require("../controllers/videoController")

router.route("/").post(videoController.createVid).get(videoController.getVideos)
router
  .route("/:id")
  .delete(videoController.deleteVideo)
  .put(videoController.updateVideo)
  .get(videoController.getVideo)

module.exports = router
