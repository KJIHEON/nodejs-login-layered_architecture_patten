const CommentsSevice = require('../services/comments.sevice')
// const {ValidationError} = require('../exceptions/index.exceptions')

class CommentsController {
  commentssevice = new CommentsSevice();
 ///코멘트 작성
  ceratecomments = async (req,res,next)=>{
    try{
    //필요한 정보를 받아옴
    const {userId,nickname} = res.locals.user
    const {postId} = req.params
    const {comment} = req.body
    if(!comment){
      return res.status(400).send({
        errorMessage : '댓글을 입력하세요' })
      }
    const ceratecomment = await this.commentssevice.ceratecomments({userId,postId,comment,nickname})
    res.status(201).send({data : ceratecomment}) 
    }catch(error){
      console.log(error)
      res.status(400).send({errorMessage : "댓글 작성 에러"})
    }
  }

  getfindById = async (req,res,next) =>{
    try{
    const {postId} = req.params
    const getcomment = await this.commentssevice.getfindById({postId})
    res.status(200).send({data : getcomment })
    }catch(error) {
    console.log(error)
    res.status(400).send({errorMessage : "댓글 조회 에러"})
}
  }

  updatecomment = async(req,res,next)=>{
    try{
    const {userId} = res.locals.user
    const {commentId} = req.params;
    const {comment} = req.body

    if(!comment){
      return res.status(400).send({
        errorMessage : '댓글을 입력하세요' })
    }
    
    const updatecomment = await this.commentssevice.updatecomment({userId,commentId,comment})
    res.status(200).send({data :updatecomment})
    }catch(error) {
    console.log(error)
    res.status(400).send({errorMessage : "댓글 수정 에러"})
}
  }

  deletecomment = async (req,res,next) =>{
    try{
    const {userId} = res.locals.user
    const {commentId} = req.params;
    await this.commentssevice.deletecomment({userId,commentId})
    res.status(200).send({msg : "댓글을 삭제 했습니다"})
    }catch(error) {
    console.log(error)
    res.status(400).send({errorMessage : "댓글 삭제 에러"})
}
  }
}
module.exports = CommentsController
