'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Html & Css Full Course',
        about: 'Course html terupdat saat ini',
        objective:
          'Course html sangat cocok untuk orang yang mau menjadi web designer',
        onboarding: 'iasdiuansdiausndiuansdiausndoiuansd',
        categoryId: 'C-0WEB',
        level: 'Beginner',
        courseType: 'Premium',
        imageUrl:
          'https://ik.imagekit.io/9c49grjkd/IMG-1702262718380_bEhmT13zVs.png',
        rating: 4.5,
        instructor: 'Eko Kurniawan',
        duration: 0,
        telegramLink: 'https://ahldaushdl.com',
        moduleCount: 3,
        price: 50000,
        createdAt: '2023-12-11T02:45:20.966Z',
        updatedAt: '2023-12-12T16:11:07.137Z',
      },
    ])
    await queryInterface.bulkInsert('Payments', [
      {
        id: '1f8c5052-b65e-4872-b9a2-74a3ededb9f3',
        courseId: 1,
        userId: 14,
        payment_type: 'qris',
        status: 'settlement',
        amount: 50000,
        gross_amount: 50000,
        date: '2023-12-13T07:36:11.509Z',
        createdAt: '2023-12-13T07:36:11.510Z',
        updatedAt: '2023-12-13T07:37:07.961Z',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {})
    await queryInterface.bulkDelete('Payments', null, {})
  },
}
