"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Payments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			courseId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			payment_type: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			amount: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			gross_amount: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			status: {
				allowNull: false,
				type: Sequelize.ENUM([
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
			},
			date: {
        allowNull: false,
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Payments")
	},
}
