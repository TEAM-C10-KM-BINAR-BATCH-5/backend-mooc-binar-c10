/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserModules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE', // if course deleted, module will deleted also
        onUpdate: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      userCourseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UserCourses',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      moduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isLocked: {
        type: Sequelize.BOOLEAN,
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
  async down(queryInterface) {
    await queryInterface.dropTable('UserModules')
  },
}
