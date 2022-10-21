const { Comments } = require('../models')


class CommentsRepository {

//댓글 작성
  ceratecomments = async({userId,postId,comment,nickname})=>{
    return await Comments.create({userId,postId,comment,nickname})
    
  }
//댓글 조회
  getfindById = async({postId})=>{
    return await Comments.findAll({postId})
  
  }
//댓글 조회
  commentfindOne = async({commentId})=>{
    return await Comments.findByPk(commentId)

  }
  //댓글 수정
  updatecomment = async({userId,commentId,comment})=>{
    return  await Comments.update({comment},{where : {userId,commentId}})

  }
  //댓글 삭제
  deletecomment = async({userId,commentId})=>{
    return await Comments.destroy({where : {userId,commentId}})
 
  }

}
module.exports = CommentsRepository;