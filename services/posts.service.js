const Postrepository= require('../repositories/posts.repository')

class Postsevice {
  Postrepository = new Postrepository() //변수를 선언한후 Postrepositorie인스턴스로 할당
//모든 게시물을 가져옴
  findAllPosts = async ()=>{
    const allpost = await this.Postrepository.findAllPosts()
    allpost.sort((a,b)=>{return b.createdAt-a.createdAt})
    return allpost.map((post)=>{
      return{
        postId: post.postId,
        userId : post.userId,
        nickname: post.nickname,
        nickname : post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes : post.likes
      }
    })

    
  }
}

module.exports = Postsevice;