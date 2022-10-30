const { Post, Comments} = require('../models');


class PostRepository {
  constructor(){
    //모킹할려고 해서 외부 Post 모델을 다시 불러옴
  }
  //모든 게시물 조회
  findAllPosts = async ()=>{
    //모든 게시물을 찾아온다.
    const app = await Post.findAll({
      include : [{
        model :Comments,
      }]
    })
      return app
  }
  //게시물 작성
  createPost = async ({userId,nickname,title ,content})=>{
    //받아온 정보를 저장함
    return await Post.create({userId,nickname, title ,content}) 

  }
 //상세페이지 조회
  getfindById = async({postId})=>{ 
    console.log(postId)
    //해당하는 아이디 값을 가지고 조회하여 가져옴
    return await Post.findByPk(postId)

  }
  //게시물 수정
  updatePost = async({userId,postId,title,content})=>{

    return await Post.pdate({title,content},{where : {postId,userId}})

  }
  //게시물 삭제
  deletePost = async({userId,postId})=>{
    return await Post.destroy({where :{userId,postId}})

  }
}
//인클루드로 찾아오기
// findAll: async(postId) => {
//   return await Comments.findAll({
//       where: { postId },
//       order: [["createdAt", "DESC"], ["commentId", "DESC"]],
//       attributes: {
//           exclude: ["postId", "deletedAt"]
//       },
//       include: {
//           model: Users,
//           attributes: ["nickname"]
//       }
//   });
// },
module.exports = PostRepository;