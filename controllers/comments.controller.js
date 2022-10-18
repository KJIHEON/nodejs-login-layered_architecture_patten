const CommentsSevice = require('../services/comments.sevice')

class CommentsController {
  commentssevice = new CommentsSevice();
 ///코멘트 작성
  ceratecomments = async (req,res,next)=>{
    //필요한 정보를 받아옴
    const {userId,nickname} = res.locals.user
    const {postId} = req.params
    const {comment} = req.body
    
    const ceratecomment = await this.commentssevice.ceratecomments({userId,postId,comment,nickname})
    res.status(201).send({data : ceratecomment})
    
  }
}
module.exports = CommentsController
