'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        allowNull: false, //필수인가?
        autoIncrement: true, //숫자 자동 매겨주는거
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      userId: {
        references :{
          model : 'Users',
          key : 'userId',
          },
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type : Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};