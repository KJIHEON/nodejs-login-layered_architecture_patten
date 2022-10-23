'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // //나는 N대 N관계의 N임
      this.belongsTo(models.Post,{targetKey : "postId", foreignKey : "postId" })
      // //유저에 종속됨
      this.belongsTo(models.User,{targetKey : "userId",foreignKey : "userId" })
    }
  }
  Like.init({
    id:{type : DataTypes.INTEGER,
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
  }, 
  {
    timestamps: false,
    sequelize,
    modelName: 'Like',
  });
  return Like;
};