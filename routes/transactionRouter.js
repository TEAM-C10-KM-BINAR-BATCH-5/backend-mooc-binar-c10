const router = require('express').Router()
const transaction = require('../controllers/transactionController')
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

router.get(
  '/',
  authenticate,
  checkRole('admin'),
  transaction.getAllTransactions,
)

module.exports = router
