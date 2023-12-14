const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserModule.hasMany(models.UserVideo, {
        foreignKey: {
          name: 'userModuleId',
          allowNull: false,
        },
      })

      UserModule.belongsTo(models.UserCourse, {
        foreignKey: {
          name: 'userCourseId',
          allowNull: false,
        },
      })
      UserModule.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
      UserModule.belongsTo(models.Module, {
        foreignKey: {
          name: 'moduleId',
          allowNull: false,
        },
      })
    }
  }
  UserModule.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      moduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userCourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isLocked: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'UserModule',
    },
  )
  return UserModule
}
