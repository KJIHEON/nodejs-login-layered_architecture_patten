const Postrepository= require('../repositories/posts.repository')
const {ValidationError} = require('../exceptions/index.exceptions')


class Postsevice {
  Postrepository = new Postrepository() //변수를 선언한후 Postrepositorie인스턴스로 할당
//모든 게시물을 가져옴
  findAllPosts = async ()=>{
    //서비스로 보내줌
    const allpost = await this.Postrepository.findAllPosts()
    //작성 날짜로 내림차순
    allpost.sort((a,b)=>{return b.createdAt-a.createdAt})
    //데이터를 가공하여 컨트롤러로 보내줌
    return allpost.map((post)=>{
      return{
        postId: post.postId,
        userId : post.userId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }
    })  
  }
   //게시물을 저장한다.
  createPost = async ({userId,nickname,title ,content})=>{
    const createpost = await this.Postrepository.createPost({userId,nickname,title ,content})
    //가공해야한다.
    return {
      postId: createpost.null,
      userId : createpost.userId,
      nickname: createpost.nickname,
      title: createpost.title,
      content: createpost.content,
      createdAt: createpost.createdAt,
      updatedAt: createpost.updatedAt, 
    }
  }
  //상세 페이지 조회
  getfindById = async ({postId})=>{
    const postOne = await this.Postrepository.getfindById({postId})
    return {
      postId: postOne.postId,
      userId : postOne.userId,
      nickname: postOne.nickname,
      title: postOne.title,
      content: postOne.content,
      createdAt: postOne.createdAt,
      updatedAt: postOne.updatedAt,
      likes : postOne.likes,
    }
  }
  //게시물 수정 하기
  updatePost = async ({userId,postId,title,content})=>{
     //포스트 아이디봐 일치하는것을 찾아옴
    const findOnePost = await this.Postrepository.getfindById({postId})
    if(findOnePost.userId !== userId){
      console.log(error)
    //  return res.status(400).send({errorMessage : "작성자가 일치 하지 않습니다."})
      throw new ValidationError("작성자가 일치 하지 않습니다.")
    }
    ///가공해서 보내줌
    await this.Postrepository.updatePost({userId,postId,title,content})
   return {
      postId: findOnePost.postId,
      userId : findOnePost.userId,
      nickname: findOnePost.nickname,
      title: findOnePost.title,
      content: findOnePost.content,
      createdAt: findOnePost.createdAt,
      updatedAt: findOnePost.updatedAt,
   }
  }

  //게시물 삭제
  deletePost = async ({userId,postId})=>{
    //포스트 아이디봐 일치하는것을 찾아옴
    const findOnePost = await this.Postrepository.getfindById({postId})
    if(findOnePost.userId !== userId){
      // return res.status(400).send({errorMessage : "작성자가 일치 하지 않습니다."})
      throw new ValidationError("작성자가 일치 하지 않습니다.")
    }
    const deletePost = await this.Postrepository.deletePost({userId,postId})
    return deletePost
  }
}

module.exports = Postsevice;