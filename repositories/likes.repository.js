const {Like , Post} = require('../models')



class LikesRepository{
  //유저가 좋아요한 게시물 모두 조회
  findLikeUser =  async({userId})=>{
    return await Like.findAll({where :{userId}})

  }
  findPost =async({postId})=>{
    //반복문에 있는postId를 기준으로 해당하는 포스트의 게시물을 불러온다.
    //, attributes: {exclude : ['content']} 필요하는거만 찾아옴
    return await Post.findByPk(postId)

  }

  //좋아요한 유저 찾기
  findOne = async({userId,postId})=>{
    return await Like.findOne({where :{userId,postId}})

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