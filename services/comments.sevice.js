const CommentsRepository = require('../repositories/comments.repository')
const {ValidationError} = require('../exceptions/index.exceptions')


class CommentsSevice {
  commentsrepository = new CommentsRepository();


  //코멘트 작성 컨트롤러에서 정보를 받아옴
  ceratecomments = async ({userId,postId,comment,nickname})=>{
    const ceratecomment = await this.commentsrepository.ceratecomments({userId,postId,comment,nickname})
    return {
      commentId: ceratecomment.null,
      userId : ceratecomment.userId,
      postId: ceratecomment.postId,
      nickname : ceratecomment.nickname,
      comment: ceratecomment.comment,
      createdAt: ceratecomment.createdAt,
      updatedAt: ceratecomment.updatedAt,
    }
  }
  //postId 값에 대항하는 댓글 조회
  getfindById = async ({postId})=>{
    const getcomment =await this.commentsrepository.getfindById({postId})
    getcomment.sort((a,b)=>b.createdAt-a.createdAt)
    return getcomment.map((comment)=>{
      return{
        commentId: comment.commentId,
        userId : comment.userId,
        nickname : comment.nickname,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      }
    })
  }
  //댓글 수정
  updatecomment = async ({userId,commentId,comment})=>{
    const commentfindOne = await this.commentsrepository.commentfindOne({commentId})
    if(commentfindOne.userId !== userId){    
      // return res.status(400).send({errorMessage : "작성자가 일치 하지 않습니다."})
      throw new ValidationError("작성자가 일치 하지 않습니다.")
    }
    await this.commentsrepository.updatecomment({userId,commentId,comment})
  }
  //댓글 삭제
  deletecomment = async ({userId,commentId})=>{
    const commentfindOne = await this.commentsrepository.commentfindOne({commentId})
    if(commentfindOne.userId !== userId){
      // return res.status(400).send({errorMessage : "작성자가 일치 하지 않습니다."})
      throw new ValidationError("작성자가 일치 하지 않습니다.")
    }
    await this.commentsrepository.deletecomment({userId,commentId})

  }
}
module.exports = CommentsSevice
