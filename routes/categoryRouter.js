const router = require('express').Router()
const categoryController = require('../controllers/categoryController')

const { Category } = require('../models')
const upload = require('../middlewares/uploader')
const checkId = require('../middlewares/checkId')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

router
  .route('/')
  .get(categoryController.getCategories)
  .post(
    authenticate,
    checkRole('admin'),
    upload.single('image'),
    categoryController.createCategory,
  )

router
  .route('/:id')
  .get(checkId(Category), categoryController.getCategory)
  .patch(
    authenticate,
    checkRole('admin'),
    checkId(Category),
    upload.single('image'),
    categoryController.updateCategory,
  )
  .delete(
    authenticate,
    checkRole('admin'),
    checkId(Category),
    categoryController.deleteCategory,
  )

module.exports = router
