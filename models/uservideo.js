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
    }
  }
  UserVideo.init(
    {
      userId: DataTypes.INTEGER,
      videoId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserVideo',
    },
  )
  return UserVideo
}
