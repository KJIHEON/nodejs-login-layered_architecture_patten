'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        references :{
          model : 'Posts',
          key : 'postId',
          },
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        references :{
          model : 'Users',
          key : 'userId',
          },
        type: Sequelize.INTEGER,
      },
      nickname: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};