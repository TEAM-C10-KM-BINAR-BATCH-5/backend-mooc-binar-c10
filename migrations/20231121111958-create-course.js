"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING
      },
      objective: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.ENUM([
          "Product Manager",
          "UI/UX",
          "Web Development",
          "Android Development",
          "Data Science",
          "Bussines Intelligence",
          "Ios Development",
          "Lainnya"
        ])
      },
      level: {
        type: Sequelize.ENUM(["Beginner", "Intermediate", "Advance"])
      },
      courseType: {
        type: Sequelize.ENUM(["Free", "Premium"])
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      trailerUrl: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      instructor: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      telegramLink: {
        type: Sequelize.STRING
      },
      moduleCount: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Courses")
  }
}
