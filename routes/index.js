const router = require("express").Router()

const videoRouter = require("./videoRouter")
const moduleRouter = require("./moduleRouter")
const courseRouter = require("./courseRouter")

router.use("/api/v1/video", videoRouter)
router.use("/api/v1/module", moduleRouter)
router.use("/api/v1/course", courseRouter)

module.exports = router
