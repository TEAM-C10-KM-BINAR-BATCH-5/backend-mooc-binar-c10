const { User } = require("../models");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.create(
      {
        name: "admin",

        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { returning: true }
    ).then(function (newSuperadmin) {
      return queryInterface.bulkInsert("Auths", [
        {
          email: "admin@gmail.com",
          password: process.env.ADMIN_PASSWORD,
          phoneNumber: 628989891122,
          userId: newSuperadmin.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("User", null, {});
  },
};
