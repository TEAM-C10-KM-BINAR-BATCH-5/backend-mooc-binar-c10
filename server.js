require("dotenv").config()
const express = require("express")
const session = require("express-session")
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 4000
const ApiError = require("./utils/apiError")
const errorHandler = require("./controllers/errorController")
const router = require("./routes")

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000 // 60 seconds
    }
  })
)

app.use(express.json())
app.use(cors())
app.use(router)

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404))
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`)
})
