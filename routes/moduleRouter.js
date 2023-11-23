const router = require("express").Router()
const moduleController = require("../controllers/moduleController")

const checkId = require("../middlewares/checkId")

const { Module } = require("../models")

router.route("/").post(moduleController.createModule).get(moduleController.getModules)

router
  .route("/:id")
  .delete(checkId(Module), moduleController.deleteModule)
  .put(checkId(Module), moduleController.updateModule)
  .get(checkId(Module), moduleController.getModule)

module.exports = router
