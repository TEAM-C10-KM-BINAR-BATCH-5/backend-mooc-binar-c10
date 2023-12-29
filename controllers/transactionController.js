const { Op } = require('sequelize')
// prettier-ignore
const {
  Payment, Course, Category, User,
} = require('../models')
const ApiError = require('../utils/apiError')

const getAllTransactions = async (req, res, next) => {
  // eslint-disable-next-line no-nested-ternary
  const categoryIds = req.query.categoryIds
    ? Array.isArray(req.query.categoryIds)
      ? req.query.categoryIds
      : req.query.categoryIds.split(',')
    : []
  const statusSearch = req.query.status || ''
  const paymentTypeSearch = req.query.paymentType || ''
  const titleSearch = req.query.title || ''
  const whereClauseCourse = {}
  const whereClausePayment = {}

  const allCategoryIndex = categoryIds.indexOf('C-0ALL')
  if (allCategoryIndex !== -1) {
    categoryIds.splice(allCategoryIndex, 1)
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
    whereClausePayment.status = statusSearch
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
          order: [['updatedAt', 'DESC']],
          include: [
            {
              model: Category,
              attributes: ['name'],
            },
          ],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
      where: whereClausePayment,
    })

    const data = dataTransaction.map((transaction) => ({
      ...transaction.toJSON(),
      transaction_date: ['capture', 'settlement'].includes(
        transaction.toJSON().transaction_status,
      )
        ? transaction.toJSON().updatedAt
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

const getUserTransactionStatusById = async (req, res, next) => {
  const transactionId = req.params.id
  try {
    const dataTransaction = await Payment.findOne({
      attributes: ['status'],
      where: {
        id: transactionId,
        userId: req.user.id,
      },
    })

    return res.status(200).json({
      success: true,
      message: 'Success, fetch',
      status: dataTransaction.status,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getUserTransactions = async (req, res, next) => {
  // eslint-disable-next-line no-nested-ternary
  const categoryIds = req.query.categoryIds
    ? Array.isArray(req.query.categoryIds)
      ? req.query.categoryIds
      : req.query.categoryIds.split(',')
    : []
  const statusSearch = req.query.status || ''
  const paymentTypeSearch = req.query.paymentType || ''
  const titleSearch = req.query.title || ''
  const whereClauseCourse = {}
  const whereClausePayment = {
    userId: req.user.id,
  }

  const allCategoryIndex = categoryIds.indexOf('C-0ALL')
  if (allCategoryIndex !== -1) {
    categoryIds.splice(allCategoryIndex, 1)
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
    whereClausePayment.status = statusSearch
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
          order: [['updatedAt', 'DESC']],
          where: whereClauseCourse,
          include: [
            {
              model: Category,
              attributes: ['name'],
            },
          ],
        },
      ],
      where: whereClausePayment,
    })

    const data = dataTransaction.map((transaction) => ({
      ...transaction.toJSON(),
      transaction_date: ['capture', 'settlement'].includes(
        transaction.toJSON().transaction_status,
      )
        ? transaction.toJSON().updatedAt
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
  getUserTransactionStatusById,
}
