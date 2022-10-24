
const LikesSevice = require('../services/likes.service')


class LikesController{
    likessevice = new LikesSevice()
    //좋아요 조회
    findpost =  async({req,res,next})=>{
      try{
      const {userId} = res.locals.user
     const findPosts = await this.likessevice.findpost({userId})
      res.status(200).send({data : findPosts})
     }catch(error) {
      next(error)
     }
    }
    //좋아요 누르기
    likes =  async(req,res,next)=>{
      try{
      const {userId} = res.locals.user
      const {postId} = req.params
      const likes = await this.likessevice.likes({postId,userId})
      res.status(201).send(likes)
      }catch(error) {
        next(error)
      }
    }
}

module.exports = LikesController