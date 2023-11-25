const router = require("express").Router()
const categoryController = require("../controllers/categoryController")

const { Category } = require("../models")
const checkId = require("../middlewares/checkId")

router.route("/").get(categoryController.getCategories).post(categoryController.createCategory)

router
  .route("/:id")
  .get(checkId(Category), categoryController.getCategory)
  .put(checkId(Category), categoryController.updateCategory)
  .delete(checkId(Category), categoryController.deleteCategory)

module.exports = router
