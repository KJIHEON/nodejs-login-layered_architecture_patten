'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //코멘트는 포스트 아이디를 참조
      this.belongsTo(models.Post,{targetKey : "postId",foreignKey: "postId",});
      // //코멘트는 유저에 유저아이디를 참조
      this.belongsTo(models.User,{targetKey : "userId",foreignKey : "userId"});
    }
  }
  Comments.init({
    commentId:{type : DataTypes.INTEGER,
      primaryKey:true},

      postId:{
        type : DataTypes.INTEGER,
        references :{
          model : 'Post',
          key : 'postId',
          },   
      }, 

      userId:{
        type : DataTypes.INTEGER,
        references :{
          model : 'User',
          key : 'userId',
          },   
      }, 
    nickname: DataTypes.STRING,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};