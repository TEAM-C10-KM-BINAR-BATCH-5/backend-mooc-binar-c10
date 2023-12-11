const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')
const progress = require('../controllers/progressController')

router.post('/:id', authenticate, checkRole('user'), progress.updateProgress)

module.exports = router
