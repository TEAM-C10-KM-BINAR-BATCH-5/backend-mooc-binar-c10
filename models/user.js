"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Auth, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });
      User.hasMany(models.Payment, {
        foreignKey: {
          name: "userId",
          allowNull: false
        }
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      role: DataTypes.ENUM(["admin", "user"]),
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      membership: DataTypes.ENUM(["free", "premium"]),
      profileUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
