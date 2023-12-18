const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')
const dashboard = require('../controllers/dashboardController')

router.get('/', authenticate, checkRole('admin'), dashboard.getDataDashboard)

module.exports = router
