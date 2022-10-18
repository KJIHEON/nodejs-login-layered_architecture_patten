const PostSevice = require('../services/posts.service') 
//포스트 서비스를 불러옴
console.log("포스트컨트롤러")
class PostController {
    // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
    postsevice = new PostSevice()

  getPost = async (req,res,next)=>{
  const Posts = await this.postsevice.findAllPosts()
  res.status(200).json({data : Posts})
  }

  createPost = async (req,res,next)=>{
    const {userId,nickname} = res.locals.user
    const {title ,content} = req.body
    const Posts = await this.postsevice.createPost({userId,nickname,title ,content})
    res.status(200).json({data : Posts})
    }
    //아이디값 하나를 찾아온다.

  getfindById = async (req,res,next)=>{
    const {postId} = req.params;
    const postOne = await this.postsevice.getfindById({postId})
    res.status(200).json({data : postOne})
  }
  updatePost = async (req,res,next)=>{
    const {postId} = req.parms;
    const {title,content} = req.body
    //하나의 게시물을 가지고온다 (상세페이지 조회 로직 사용)
    await this.postsevice.getfindById({postId})
    const updatepostOne = await this.post
  }
}

module.exports = PostController;