const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserCourse.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
      UserCourse.belongsTo(models.Course, {
        foreignKey: {
          name: 'courseId',
          allowNull: false,
        },
      })
      UserCourse.hasMany(models.UserModule, {
        foreignKey: {
          name: 'userCourseId',
          allowNull: false,
        },
      })
    }
  }
  UserCourse.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courseId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      about: DataTypes.STRING,
      objective: DataTypes.STRING,
      onboarding: {
        type: DataTypes.STRING,
      },
      categoryId: {
        type: DataTypes.STRING,
      },
      level: {
        type: DataTypes.ENUM(['Beginner', 'Intermediate', 'Advance']),
      },
      courseType: {
        type: DataTypes.ENUM(['Free', 'Premium']),
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      instructor: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      telegramLink: {
        type: DataTypes.STRING,
      },
      moduleCount: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'UserCourse',
    },
  )
  return UserCourse
}
