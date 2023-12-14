const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Video.belongsTo(models.Module, {
        foreignKey: {
          name: 'moduleId',
        },
      })
      Video.hasMany(models.UserVideo, {
        foreignKey: {
          name: 'videoId',
          allowNull: false,
        },
      })
    }
  }
  Video.init(
    {
      title: DataTypes.STRING,
      no: DataTypes.INTEGER,
      videoUrl: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      moduleId: DataTypes.INTEGER,
      isLocked: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Video',
    },
  )
  return Video
}
