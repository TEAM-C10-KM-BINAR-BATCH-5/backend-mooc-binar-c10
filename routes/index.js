const router = require("express").Router();

const videoRouter = require("./videoRouter");
const moduleRouter = require("./moduleRouter");
const courseRouter = require("./courseRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");

router.use("/api/v1/video", videoRouter);
router.use("/api/v1/module", moduleRouter);
router.use("/api/v1/course", courseRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/auth", authRouter);

module.exports = router;
