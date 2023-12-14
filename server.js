// Import required modules
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')

// Create an Express app
const app = express()

// Import custom modules
const ApiError = require('./utils/apiError')
const errorHandler = require('./controllers/errorController')
const router = require('./routes')

// Configure Express to use express-session middleware
app.use(
  session({
    secret: 'secret', // Change this to a more secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 }, // Set the desired max age for the session
  }),
)

// Use other middlewares
app.use(express.json())
app.use(cors())
app.use(router)

// Handle 404 errors
app.all('*', (req, res, next) => {
  next(new ApiError('Route does not exist', 404))
})

// Error handling middleware
app.use(errorHandler)

// Export the Express app
module.exports = app
