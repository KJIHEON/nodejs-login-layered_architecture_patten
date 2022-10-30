jest.mock('../../../models/post.js')
//모킹할 모델
const Posts = require("../../../repositories/posts.repository.js")
//저장소
const Post = require("../../../models/post.js")

describe('포스트 테스트',()=>{
  let post = {
    userId : 1,
    nickname : "dsa",
    title : "123456",
    content : "123"
  }
  Post.create = jest.fn((post)=>{
    const keys = Object.keys(post).length
    if(keys !== 4) return false
    return true
  })
  test("게시물 작성", async ()=>{
  
    const result = await Posts.createPost(post)
    expect(Post.create).toBecalledWith(post)
  })
})