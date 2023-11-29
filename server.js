require("dotenv").config();
const express = require("express");
const session = require("express-session");

const app = express();

const PORT = process.env.PORT || 4000;
const ApiError = require("./utils/apiError");
const errorHandler = require("./controllers/errorController");
const router = require("./routes");
const setHeaders = require("./middlewares/setHeaders");

app.use(express.json());
app.use(setHeaders);
app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 60000, // 60 seconds
    },
  })
);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
