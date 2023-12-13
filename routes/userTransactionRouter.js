const router = require('express').Router()
const { Payment } = require('../models')
const transaction = require('../controllers/transactionController')
const authenticate = require('../middlewares/authenticate')
const checkId = require('../middlewares/checkId')
const checkRole = require('../middlewares/checkRole')

router.get(
  '/',
  authenticate,
  checkRole('user'),
  transaction.getUserTransactions,
)

router.get(
  '/:id',
  authenticate,
  checkRole('user'),
  checkId(Payment),
  transaction.getUserTransactionStatusById,
)

module.exports = router
