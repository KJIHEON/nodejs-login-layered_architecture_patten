'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};