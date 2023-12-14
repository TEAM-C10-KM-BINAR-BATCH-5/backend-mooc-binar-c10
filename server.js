// Import required modules
require('dotenv').config()
const express = require('express')
const cors = require('cors')

// Create an Express app
const app = express()

// Import custom modules
const ApiError = require('./utils/apiError')
const errorHandler = require('./controllers/errorController')
const router = require('./routes')

// Use other middlewares
app.use(express.json())
app.use(cors())
app.use(router)

// Handle 404 errors
app.all('*', (req, res, next) => {
  next(new ApiError('Routes does not exist', 404))
})

// Error handling middleware
app.use(errorHandler)

// Export the Express app
module.exports = app
