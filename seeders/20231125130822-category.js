"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        id: "C-0PM",
        name: "Product Management",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "C-0UIX",
        name: "UI/UX",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "C-0WEB",
        name: "Web Development",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "C-0AND",
        name: "Android Development",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "C-0DS",
        name: "Data Science",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "C-0BI",
        name: "Business Intelligence",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "C-0IOS",
        name: "Ios Development",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "C-0DM",
        name: "Digital Marketing",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "C-0OT",
        name: "Lainnya",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {})
  }
}
