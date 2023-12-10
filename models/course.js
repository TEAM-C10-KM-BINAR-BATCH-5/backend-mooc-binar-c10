const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.Module, {
        foreignKey: {
          name: 'courseId',
        },
      })

      Course.belongsTo(models.Category, {
        foreignKey: {
          name: 'categoryId',
          allowNull: false,
        },
      })

      Course.hasMany(models.UserCourse, {
        foreignKey: {
          name: 'courseId',
          allowNull: false,
        },
      })

      Course.hasMany(models.Payment, {
        foreignKey: {
          name: 'courseId',
          allowNull: false,
        },
      })

      Course.hasMany(models.UserVideo, {
        foreignKey: {
          name: 'courseId',
          allowNull: false,
        },
      })
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      about: DataTypes.STRING,
      objective: DataTypes.STRING,
      onboarding: DataTypes.STRING,
      categoryId: DataTypes.STRING,
      level: DataTypes.ENUM(['Beginner', 'Intermediate', 'Advance']),
      courseType: DataTypes.ENUM(['Free', 'Premium']),
      imageUrl: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      instructor: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      telegramLink: DataTypes.STRING,
      moduleCount: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Course',
    },
  )
  return Course
}
