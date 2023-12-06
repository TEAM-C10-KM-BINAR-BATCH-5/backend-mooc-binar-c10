require('dotenv').config()
const express = require('express')
const cookieSession = require('cookie-session')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 4000
const ApiError = require('./utils/apiError')
const errorHandler = require('./controllers/errorController')
const router = require('./routes')

app.use(
  cookieSession({
    name: 'session',
    keys: ['secret'],

    maxAge: 60 * 1000,
  })
)

app.use(express.json())
app.use(cors())
app.use(router)

app.all('*', (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404))
})

app.use(errorHandler)

module.exports = app
