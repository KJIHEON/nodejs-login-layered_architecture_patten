const {Like , Post} = require('../models')


//attributes : { exclude : ['content']},order : [['createAt', 'DESC']]
class LikesRepository{
  //유저가 좋아요한 게시물 모두 조회
  findLikeUser =  async({userId})=>{
    const like = await Like.findAll({
      where :{userId},
      include : [{
        model : Post,
      }]
    })
    return like
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