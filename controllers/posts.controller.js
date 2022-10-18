const PostSevice = require('../services/posts.service') 
//포스트 서비스를 불러옴
console.log("포스트컨트롤러")
class PostController {
    // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
    postsevice = new PostSevice()
//모든 게시물 찾아오기
  getPost = async (req,res,next)=>{
  const Posts = await this.postsevice.findAllPosts()
  res.status(200).json({data : Posts})
  }
//게시물 저장
  createPost = async (req,res,next)=>{
    const {userId,nickname} = res.locals.user
    const {title ,content} = req.body
    const Posts = await this.postsevice.createPost({userId,nickname,title ,content})
    res.status(201).json({data : Posts})
    }

    //상제페이지 조회
  getfindById = async (req,res,next)=>{
    const {postId} = req.params;
    const postOne = await this.postsevice.getfindById({postId})
    res.status(200).json({data : postOne})
  }
  //페이지 수정
  updatePost = async (req,res,next)=>{
    const {userId} = res.locals.user
    const {postId} = req.params;
    const {title,content} = req.body
    //수정할 것을 보내준다
    const updatepostOne = await this.postsevice.updatePost({userId,postId,title,content})
    res.status(200).json({data : updatepostOne})
  }
  deletePost = async (req,res,next)=>{
    const {userId} = res.locals.user
    const {postId} = req.params
    const deletePost = await this.postsevice.deletePost({userId,postId})
    res.status(200).json({data : deletePost})
  }
}

module.exports = PostController;