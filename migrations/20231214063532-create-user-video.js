/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserVideos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userModuleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'UserModules',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      videoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      courseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      no: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      videoUrl: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('UserVideos')
  },
}
