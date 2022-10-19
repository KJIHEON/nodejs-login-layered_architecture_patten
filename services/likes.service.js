
const LikesRepository = require('../repositories/likes.repository')


class LikesSevice{
    likesrepository = new LikesRepository()
    //좋아요 조회하기
    findpost =  async({userId})=>{
      const findPost = await this.likesrepository.findpost({userId})
      console.log(findPost)
    }
  //좋아요 하기
    likes =  async({postId,userId})=>{

     const findlike = await this.likesrepository.findOne({userId,postId})

      if(!findlike){
        await this.likesrepository.likeUp({postId,userId})
        return ({msg : "좋아요를 등록했습니다."})

      }else {
        await this.likesrepository.likeDown({postId,userId})
        return ({msg : "좋아요를 취소했습니다."})
      }
    }
}

module.exports = LikesSevice