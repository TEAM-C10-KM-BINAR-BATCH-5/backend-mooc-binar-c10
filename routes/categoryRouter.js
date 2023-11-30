const router = require("express").Router()
const categoryController = require("../controllers/categoryController")

const { Category } = require("../models")
const checkId = require("../middlewares/checkId")
const authenticate = require("../middlewares/authenticate")
const checkRole = require("../middlewares/checkRole")

router
  .route("/")
  .get(categoryController.getCategories)
  .post(authenticate, checkRole("admin"), categoryController.createCategory)

router
  .route("/:id")
  .get(checkId(Category), categoryController.getCategory)
  .put(authenticate, checkRole("admin"), checkId(Category), categoryController.updateCategory)
  .delete(authenticate, checkRole("admin"), checkId(Category), categoryController.deleteCategory)

module.exports = router
