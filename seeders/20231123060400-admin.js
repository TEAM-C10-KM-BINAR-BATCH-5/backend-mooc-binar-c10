'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    const idAdmin = await queryInterface.rawSelect(
      'Users',
      {
        where: { name: 'admin' },
      },
      ['id'],
    )

    await queryInterface.bulkInsert('Auths', [
      {
        email: 'binar.team.c10@gmail.com',
        password: process.env.ADMIN_PASSWORD,
        userId: idAdmin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Auths', null, {})
  },
}
