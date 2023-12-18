const router = require('express').Router()
const moduleController = require('../controllers/moduleController')

const checkId = require('../middlewares/checkId')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

const { Module, Course } = require('../models')

router
  .route('/')
  .post(authenticate, checkRole('admin'), moduleController.createModule)
  .get(moduleController.getModules)

router.get(
  '/course/:id',
  checkId(Course),
  moduleController.getModulesByCourseId,
)

router
  .route('/:id')
  .delete(
    authenticate,
    checkRole('admin'),
    checkId(Module),
    moduleController.deleteModule,
  )
  .put(
    authenticate,
    checkRole('admin'),
    checkId(Module),
    moduleController.updateModule,
  )
  .get(checkId(Module), moduleController.getModule)

module.exports = router
