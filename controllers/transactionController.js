const { Op } = require('sequelize')

const { Payment, Course } = require('../models')
const ApiError = require('../utils/apiError')

const getAllTransactions = async (req, res, next) => {
  const categoryIds = req.query.categoryIds
    ? req.query.categoryIds.split(',')
    : []
  const statusSearch = req.query.status || ''
  const paymentTypeSearch = req.query.paymentType || ''
  const titleSearch = req.query.title || ''
  const whereClauseCourse = {}
  const whereClausePayment = {}

  if (categoryIds.length > 0) {
    whereClauseCourse.categoryId = {
      [Op.in]: categoryIds,
    }
  }

  if (titleSearch) {
    whereClauseCourse.title = {
      [Op.iLike]: `%${titleSearch}%`,
    }
  }

  if (statusSearch) {
    whereClausePayment.status = {
      [Op.iLike]: `%${statusSearch}%`,
    }
  }
  if (paymentTypeSearch) {
    whereClausePayment.payment_type = {
      [Op.iLike]: `%${paymentTypeSearch}%`,
    }
  }
  try {
    const dataTransaction = await Payment.findAll({
      include: [
        {
          model: Course,
          where: whereClauseCourse,
        },
      ],
      where: whereClausePayment,
    })

    const data = dataTransaction.toJSON().map((transaction) => ({
      ...transaction,
      transaction_date: ['capture', 'settlement'].includes(
        transaction.transaction_status,
      )
        ? transaction.updatedAt
        : null,
    }))
    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getUserTransactions = async (req, res, next) => {
  const categoryIds = req.query.categoryIds
    ? req.query.categoryIds.split(',')
    : []
  const statusSearch = req.query.status || ''
  const paymentTypeSearch = req.query.paymentType || ''
  const titleSearch = req.query.title || ''
  const whereClauseCourse = {}
  const whereClausePayment = {
    userId: req.user.id,
  }

  if (categoryIds.length > 0) {
    whereClauseCourse.categoryId = {
      [Op.in]: categoryIds,
    }
  }

  if (titleSearch) {
    whereClauseCourse.title = {
      [Op.iLike]: `%${titleSearch}%`,
    }
  }

  if (statusSearch) {
    whereClausePayment.status = {
      [Op.iLike]: `%${statusSearch}%`,
    }
  }
  if (paymentTypeSearch) {
    whereClausePayment.payment_type = {
      [Op.iLike]: `%${paymentTypeSearch}%`,
    }
  }
  try {
    const dataTransaction = await Payment.findAll({
      include: [
        {
          model: Course,
          where: whereClauseCourse,
        },
      ],
      where: whereClausePayment,
    })

    const data = dataTransaction.toJSON().map((transaction) => ({
      ...transaction,
      transaction_date: ['capture', 'settlement'].includes(
        transaction.transaction_status,
      )
        ? transaction.updatedAt
        : null,
    }))
    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  getAllTransactions,
  getUserTransactions,
}
