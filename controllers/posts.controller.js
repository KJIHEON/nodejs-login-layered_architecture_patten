const PostSevice = require('../services/posts.service') 
// const InvalidParamsError = require('../exceptions/index.exceptions')
//포스트 서비스를 불러옴
console.log("포스트컨트롤러")
class PostController {
    // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
    postsevice = new PostSevice()
//모든 게시물 찾아오기
  getPost = async (req,res,next)=>{
  try{
  const Posts = await this.postsevice.findAllPosts()
  res.status(200).json({data : Posts})
  
  }catch(error) {
  console.log(error)
  res.status(400).send({errorMessage : "정보가 일치 하지 않습니다."})
}
  }
//게시물 저장
  createPost = async (req,res,next)=>{
    try {
    const {userId,nickname} = res.locals.user
    const {title ,content} = req.body
    await this.postsevice.createPost({userId,nickname,title ,content})
    res.status(201).json({msg : "게시물을 저장헀습니다"})
    }catch(error) {
   next(error)
}
    }

    //상제페이지 조회
  getfindById = async (req,res,next)=>{
    try{
    const {postId} = req.params;
    const postOne = await this.postsevice.getfindById({postId})
    res.status(200).json({data : postOne})
  
    }catch(error) {
    next(error)
}
  }
  //페이지 수정
  updatePost = async (req,res,next)=>{
    try{

    const {userId} = res.locals.user
    const {postId} = req.params;
    const {title,content} = req.body
    //수정할 것을 보내준다
    await this.postsevice.updatePost({userId,postId,title,content})
    res.status(200).json({msg : "게시물을 수정했습니다"})
    }catch(error) {
    next(error)
}
  }
  //게시물 삭제
  deletePost = async (req,res,next)=>{
    try{

    const {userId} = res.locals.user
    const {postId} = req.params
    await this.postsevice.deletePost({userId,postId})
    res.status(200).json({msg : "게시물을 삭제했습니다."})

    }catch(error) {
    next(error)
}
  }
}

module.exports = PostController;