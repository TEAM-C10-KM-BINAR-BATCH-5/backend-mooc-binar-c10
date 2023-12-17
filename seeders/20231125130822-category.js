'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        id: 'C-0ALL',
        name: 'ALL',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/istockphoto-849381872-612x612.jpg?updatedAt=1702804292994',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'C-0PM',
        name: 'Product Management',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/pm.png?updatedAt=1702571046747',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'C-0UIX',
        name: 'UI/UX',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/uiux.png?updatedAt=1702571031952',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'C-0WEB',
        name: 'Web Development',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/webdev.png?updatedAt=1702571003474',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'C-0AND',
        name: 'Android Development',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/anddev.png?updatedAt=1702571096609',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'C-0DS',
        name: 'Data Science',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/datascience.png?updatedAt=1702570987213',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'C-0BI',
        name: 'Business Intelligence',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/bi.png?updatedAt=1702570942212',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'C-0IOS',
        name: 'Ios Development',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/webdev.png?updatedAt=1702571003474',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'C-0DM',
        name: 'Digital Marketing',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/bi.png?updatedAt=1702570942212',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'C-0OT',
        name: 'Lainnya',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/sven-brandsma-C5SUkYZT7nU-unsplash.jpg?updatedAt=1702804279866',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {})
  },
}
