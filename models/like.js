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
      //나는 1대 N관계의 N임
      // this.belongsTo(models.Post,{ foreignKey : "postId" })
      //N대 N관계의 N이다
      // this.belongsToMany(models.Post,{ foreignKey : "postId" }) //테이블명임 하단에 모델 네임
    }
  }
  Like.init({
    id:{type : DataTypes.INTEGER,
      primaryKey:true},
    postId:{
      type : DataTypes.INTEGER,
      references :{
        model : 'Posts',
        key : 'postId',
        },   
    }, 
    userId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Like',
  });
  return Like;
};