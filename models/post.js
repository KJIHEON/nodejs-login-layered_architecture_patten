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
      //나는 1대 N관계의 1이고
      // this.hasOne(models.Like,{ as : "Like",foreignKey : "PostId" })
      //N대 N관계의 N이고
      // this.hasMany(models.Like,{ as : "Like",foreignKey : "PostId" }) 
    }
  }
  Post.init({
    postId:{type : DataTypes.INTEGER,
            primaryKey:true},
    nickname: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    title : DataTypes.STRING,
    content : DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Post',
  });
  return Post;
};