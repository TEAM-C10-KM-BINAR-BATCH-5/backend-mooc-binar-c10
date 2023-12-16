const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Module.hasMany(models.Video, {
        foreignKey: {
          name: 'moduleId',
        },
      })

      Module.belongsTo(models.Course, {
        foreignKey: {
          name: 'courseId',
        },
      })
    }
  }
  Module.init(
    {
      title: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      isLocked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Module',
    },
  )
  return Module
}
