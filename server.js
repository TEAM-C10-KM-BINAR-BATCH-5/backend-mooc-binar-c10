require("dotenv").config()
const express = require("express")

const app = express()
const PORT = process.env.PORT || 4000
const videoRouter = require("./routes/videoRouter")
const moduleRouter = require("./routes/moduleRouter")
const courseRouter = require("./routes/courseRouter")
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*") // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  next()
})

app.use("/api/v1/video", videoRouter)
app.use("/api/v1/module", moduleRouter)
app.use("/api/v1/course", courseRouter)

app.get("/", (req, res) => {
  res.send("hello wolrd")
})

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`)
})
