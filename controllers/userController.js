const { User, Auth } = require("../models");
const ApiError = require("../utils/apiError");

const findUsers = async (req, res, next) => {
  try {
    const Users = await User.findAll({
      include: ["Auth"],
    });

    res.status(200).json({
      status: "Success",
      data: {
        Users,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: ["Auth"],
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateUser = async (req, res, next) => {
  const { name, country, city } = req.body;
  try {
    await User.update(
      {
        name,
        country,
        city,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "User updated successfully",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  const { name, price, stock } = req.body;
  try {
    await Auth.destroy({
      where: {
        userId: req.params.id,
      },
    });
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete user",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
