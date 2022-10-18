const { Posts } = require('../models/post');


class PostRepositorie {
  findAllPosts = async ()=>{
    const posts = await Posts.findAll();
    return posts
  }
}

module.exports = PostRepositorie;