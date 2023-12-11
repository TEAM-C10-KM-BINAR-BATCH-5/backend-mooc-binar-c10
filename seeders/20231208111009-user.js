'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'syifa',
        role: 'user',
        membership: 'free',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    const idSyifa = await queryInterface.rawSelect(
      'Users',
      {
        where: { name: 'syifa' },
      },
      ['id'],
    )

    await queryInterface.bulkInsert('Auths', [
      {
        email: 'syifa@gmail.com',
        password:
          '$2a$12$2rzIPBQAoT1x7KffKJxK9.DepLKRm3m9b4NUjSbkGLMKIHO.Ic8pa',
        phoneNumber: 6288716534418,
        userId: idSyifa,
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
