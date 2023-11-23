const bcrypt = require("bcrypt");
const { Auth, User } = require("../models");
const ApiError = require("../utils/apiError");

const register = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, country, city } = req.body;

    // validasi untuk check apakah email nya udah ada
    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return next(new ApiError("User email already taken", 400));
    }

    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    // Test the email against the regular expression
    if (!emailRegex.test(email)) {
      return next(new ApiError("Please enter a valid email address", 400));
    }

    // minimum password length
    const passwordLength = password <= 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 400));
    }
    // validate phone number
    const phoneRegex = /^(?:\+62|62|0)[2-9]\d{7,11}$/;

    // Test the phone number against the regular expression
    if (!phoneRegex.test(phoneNumber)) {
      // Phone number is invalid
      return next(new ApiError("Please enter a valid phone number", 400));
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = await User.create({
      name,
      country,
      city,
      role: "user",
      memberType: "free",
      profileUrl: "adadadadad",
    });

    await Auth.create({
      email,
      password: hashedPassword,
      phoneNumber,
      userId: newUser.id,
    });

    res.status(201).json({
      status: "Success",
      data: {
        ...newUser,
        phoneNumber,
        email,
        password: hashedPassword,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
};
