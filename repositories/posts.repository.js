const { Post } = require('../models');


class PostRepository {
  //모든 게시물 조회
  findAllPosts = async ()=>{
    //모든 게시물을 찾아온다.
    const posts = await Post.findAll();
    return posts
  }
  //게시물 작성
  createPost = async ({userId,nickname,title ,content})=>{
    console.log(userId,nickname,title ,content,"레포")
    //받아온 정보를 저장함
    const createpost = await Post.create({userId,nickname,title ,content}) 
    return createpost
  }
 //상세페이지 조회
  getfindById = async({postId})=>{ 
    //해당하는 아이디 값을 가지고 조회하여 가져옴
    const postOne = await Post.findByPk(postId)
    return postOne
  }
}

module.exports = PostRepository;