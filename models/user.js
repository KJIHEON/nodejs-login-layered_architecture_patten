'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // //하나의 유저는 많은 좋아요를 누를수 있다.
      this.hasMany(models.Like, {sourceKey: "userId",foreignKey: "userId"});
      // // 하나의 유저는 많은 게시물을 쓸 수 있다

      //포스트로 유저 아이디를 보낸다.
      this.hasMany(models.Post,{ sourceKey : "userId",foreignKey : "userId" })
      // // 하나의 유저는 많은 코멘트를 쓸수 있다.(많은 코멘트 아이디를 가짐)
      this.hasMany(models.Comments,{sourceKey : "userId",foreignKey : "userId" })
    }
  }
  User.init({
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:  DataTypes.INTEGER
    },
    nickname: {
      type:  DataTypes.STRING
    },
    password: {
      type:  DataTypes.STRING
    },
    RefreshToken: {
      type:  DataTypes.STRING
    },
    
    

  }, {
    timestamps: false,
    sequelize,
    modelName: 'User',
  });
  return User;
};