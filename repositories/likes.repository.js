const {Like , Post} = require('../models')



class LikesRepository{
  findpost =  async({userId})=>{
    const findpost = await Like.findAll({where :{userId}})
    return findpost
  }
  //좋아요한 유저 찾기
  findOne = async({userId,postId})=>{
    const findpost = await Like.findOne({where :{userId,postId}})
    return findpost
  }
  //좋아요 등록하기
  likeUp = async({postId,userId})=>{
    await Post.increment({likes : 1},{where :{postId}})
    await Like.create({userId,postId})
  }
  //좋아요 취소하기
  likeDown = async({postId,userId})=>{
    await Post.increment({likes : -1},{where :{postId}})
    await Like.destroy({where :{userId,postId}})
  }
 
}

module.exports = LikesRepository