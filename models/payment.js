"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Payment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
      Payment.belongsTo(models.Course, {
        foreignKey: {
          name: "courseId",
          allowNull: false
        }
      })
      Payment.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false
        }
      })
		}
	}
	Payment.init(
		{
			courseId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			payment_type: DataTypes.STRING,
			status: DataTypes.ENUM([
				"authorize",
				"capture",
				"settlement",
				"deny",
				"pending",
				"cancel",
				"refund",
				"partial_refund",
				"chargeback",
				"partial_chargeback",
				"expire",
				"failure",
			]),
			amount: DataTypes.INTEGER,
			gross_amount: DataTypes.INTEGER,
			date: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "Payment",
		}
	)
	return Payment
}
