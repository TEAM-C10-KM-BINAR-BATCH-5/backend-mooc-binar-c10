const router = require("express").Router()
const moduleController = require("../controllers/moduleController")

router.route("/").post(moduleController.createModule).get(moduleController.getModules)

router
  .route("/:id")
  .delete(moduleController.deleteModule)
  .put(moduleController.updateModule)
  .get(moduleController.getModule)

module.exports = router
