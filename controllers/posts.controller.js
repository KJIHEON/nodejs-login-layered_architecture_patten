const PostSevice = require('../services/posts.service') 
//포스트 서비스를 불러옴

class PostController {
    // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
    Postsevice = new PostSevice()

  getposts = async (req,res,next)=>{
  const Posts = await this.PostSevice.findAllPosts()
  return res.status(200).json({data : Posts})
  }
}

module.exports = PostController;