const Postrepository= require('../repositories/posts.repository')

class Postsevice {
  Postrepository = new Postrepository() //변수를 선언한후 Postrepositorie인스턴스로 할당
//모든 게시물을 가져옴
  findAllPosts = async ()=>{
    //서비스로 보내줌
    const allpost = await this.Postrepository.findAllPosts()
    console.log(allpost,"갯요청이요")
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
    console.log(title,content,"서비스")
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
    }
  }
}

module.exports = Postsevice;