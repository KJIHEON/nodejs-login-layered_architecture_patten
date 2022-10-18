const { Comments } = require('../models')


class CommentsRepository {


  ceratecomments =async({userId,postId,comment,nickname})=>{
    const commentcreate = await Comments.create({userId,postId,comment,nickname})
    return commentcreate
  }


}
module.exports = CommentsRepository;