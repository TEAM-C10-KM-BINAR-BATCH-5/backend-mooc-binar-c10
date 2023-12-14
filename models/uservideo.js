const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserVideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserVideo.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
      UserVideo.belongsTo(models.Course, {
        foreignKey: {
          name: 'courseId',
          allowNull: false,
        },
      })
      UserVideo.belongsTo(models.Video, {
        foreignKey: {
          name: 'videoId',
          allowNull: false,
        },
      })
      UserVideo.belongsTo(models.UserModule, {
        foreignKey: {
          name: 'userModuleId',
          allowNull: false,
        },
      })
    }
  }
  UserVideo.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      videoId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userModuleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      no: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      videoUrl: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      isLocked: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'UserVideo',
    },
  )
  return UserVideo
}
