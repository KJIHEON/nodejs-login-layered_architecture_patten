const CommentsRepository = require('../repositories/comments.repository')

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
}
module.exports = CommentsSevice
