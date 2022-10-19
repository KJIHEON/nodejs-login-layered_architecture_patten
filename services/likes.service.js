
const LikesRepository = require('../repositories/likes.repository')


class LikesSevice{
    likesrepository = new LikesRepository()
    //좋아요 조회하기
    findpost =  async({userId})=>{
      const findLikeUser = await this.likesrepository.findLikeUser({userId})
      const PostIds = findLikeUser.map((likes)=>likes.postId)  //불러온 게시물의 포스트 아이디를 찾는다.
      const likePost = [] 
      for (const postId of PostIds){ //for of 문을 이용하여 PostIds의 포스트 아이디를 하나씩 넣어준다.
        const post = await this.likesrepository.findPost({postId})
        const data = {        //불러온 정보를 정렬해서 재할당 해준다
          postId : post.postId,   
          userId : post.userId,
          nickname : post.nickname,
          title : post.title,
          createdAt :post.createdAt,
          updatedAt :post.updatedAt,
          likes : post.likes
          }
          likePost.push(data) //data에 푸쉬 해준다
      }
       return likePost.sort((a,b)=>b.likes-a.likes) 
       
    }
  //좋아요 하기
    likes =  async({postId,userId})=>{

     const findlike = await this.likesrepository.findOne({userId,postId})
      //좋아요 등록
      if(!findlike){
        await this.likesrepository.likeUp({postId,userId})
        return ({msg : "좋아요를 등록했습니다."})
        //좋아요 취소
      }else {
        await this.likesrepository.likeDown({postId,userId})
        return ({msg : "좋아요를 취소했습니다."})
      }
    }
}

module.exports = LikesSevice