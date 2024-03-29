const router = require('express').Router()
const swaggerUI = require('swagger-ui-express')

const swaggerDocument = require('../docs/swagger.json')
const videoRouter = require('./videoRouter')
const moduleRouter = require('./moduleRouter')
const courseRouter = require('./courseRouter')
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const otpRouter = require('./otpRouter')
const resetPassword = require('./resetPasswordRouter')
const categoryRouter = require('./categoryRouter')
const paymentRouter = require('./paymentRouter')
const enrollmentRouter = require('./enrollmentRouter')
const notificationRouter = require('./notificationRouter')
const progressRouter = require('./progressRouter')
const transactionRouter = require('./transactionRouter')
const userTransactionRouter = require('./userTransactionRouter')
const dashboardRouter = require('./dashboardRouter')

router.use('/api/v1/video', videoRouter)
router.use('/api/v1/module', moduleRouter)
router.use('/api/v1/course', courseRouter)
router.use('/api/v1/user', userRouter)
router.use('/api/v1/auth', authRouter)
router.use('/api/v1/otp', otpRouter)
router.use('/api/v1/reset-password', resetPassword)
router.use('/api/v1/category', categoryRouter)
router.use('/api/v1/payment', paymentRouter)
router.use('/api/v1/enrollment', enrollmentRouter)
router.use('/api/v1/notification', notificationRouter)
router.use('/api/v1/progress', progressRouter)
router.use('/api/v1/transaction', transactionRouter)
router.use('/api/v1/user-transaction', userTransactionRouter)
router.use('/api/v1/dashboard', dashboardRouter)

router.use('/api-docs', swaggerUI.serve)
router.use('/api-docs', swaggerUI.setup(swaggerDocument))

module.exports = router
