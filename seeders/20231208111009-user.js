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
      {
        name: 'adella',
        role: 'user',
        membership: 'free',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'jordy',
        role: 'user',
        membership: 'free',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'fajrin',
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
    const idAdella = await queryInterface.rawSelect(
      'Users',
      {
        where: { name: 'adella' },
      },
      ['id'],
    )
    const idJordy = await queryInterface.rawSelect(
      'Users',
      {
        where: { name: 'jordy' },
      },
      ['id'],
    )
    const idFajrin = await queryInterface.rawSelect(
      'Users',
      {
        where: { name: 'fajrin' },
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
      {
        email: 'adella@gmail.com',
        password:
          '$2a$12$r7BubsRWRr72jLkuvIixhOxW7dSxwYvIowQF9QOlEheI.PPkFHYQi',
        phoneNumber: 6288716534418,
        userId: idAdella,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jordy@gmail.com',
        password:
          '$2a$12$rohm6Z2dvr84HceLQCa5IumU8A6MeZUnn0.0i6CsUGdl1tPsB8OZW',
        phoneNumber: 6288716534418,
        userId: idJordy,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'fajrin@gmail.com',
        password:
          '$2a$12$Nw01LwGqIP38MFUXrHd2c.C6U8IrxU1J2vyppMqL3dGvSzcDraDXu',
        phoneNumber: 6288716534418,
        userId: idFajrin,
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
