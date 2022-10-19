const { Comments } = require('../models')


class CommentsRepository {

//댓글 작성
  ceratecomments = async({userId,postId,comment,nickname})=>{
    const commentcreate = await Comments.create({userId,postId,comment,nickname})
    return commentcreate
  }
//댓글 조회
  getfindById = async({postId})=>{
    const getcomment =await Comments.findAll({postId})
    return getcomment
  }
//댓글 조회
  commentfindOne = async({commentId})=>{
  const commentfindOne = await Comments.findByPk(commentId)
  return commentfindOne
  }
  //댓글 수정
  updatecomment = async({userId,commentId,comment})=>{
    const updatecomment = await Comments.update({comment},{where : {userId,commentId}})
    return updatecomment
  }
  //댓글 삭제
  deletecomment = async({userId,commentId})=>{
    const deletecomment = await Comments.destroy({where : {userId,commentId}})
    return deletecomment
  }

}
module.exports = CommentsRepository;