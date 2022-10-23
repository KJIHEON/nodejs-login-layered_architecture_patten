'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //포스트는 유저에서 보낸 유저아이디를 받아서 포링키로 보내준다
      this.belongsTo(models.User,{targetKey : "userId",foreignKey : "userId" })
      //포스트는 많은 코멘트를 가질 수 있다
      this.hasMany(models.Comments,{ sourceKey : "postId",foreignKey : "postId" });
      //포스트는 많은 좋아요를 가질 수 있다ser is associated to Post using an alias. You must use the 'as' keyword to specify the alias within your include statement.
      this.hasMany(models.Like, {sourceKey: "postId",foreignKey: "postId"});
      // //N대 N관계의 N이고
      
    }
  }
  Post.init({
    postId:{type : DataTypes.INTEGER,
            primaryKey:true},
    nickname: DataTypes.STRING,
    userId:{
      type : DataTypes.INTEGER,
      references :{
        model : 'User',
        key : 'userId',
        },   
    }, 
    title : DataTypes.STRING,
    content : DataTypes.STRING,
    likes :{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};