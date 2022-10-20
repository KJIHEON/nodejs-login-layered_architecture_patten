const PostRepository = require('../../../repositories/posts.repository')

//
const mockPostModel = ()=>({
    findAll : jest.fn(),
    create :  jest.fn(),
    findByPk :  jest.fn(),
    update :  jest.fn(),
    destroy :  jest.fn(),
  })
//describe 설명하다
describe("PostreRository Layer Text",() => {
  //인스턴스화 시킴
let postrepository = new PostRepository()
//시퀄라이즈 모델을 모킹함
 postrepository.post = mockPostModel()
 

 beforeEach(()=>{
  //모든mock을 리셋한다.
  jest.resetAllMocks()
 })
 
test("포스트레포 안에 있는 getAll Method",async ()=>{
  //postrepository안에 있는 getAllposts를 실행해서 반환해주는걸 테스트
 const findAllPostsresult = 
{
  "postId": 8,
  "userId": 2,
  "nickname": "Developer",
  "title": "안녕하세요 2번째 게시글 제목입니다.",
  "createdAt": "2022-08-04T14:45:40.000Z",
  "updatedAt": "2022-08-04T14:45:40.000Z",
  "likes": 0
}


  postrepository.post.findAll = jest.fn(()=>{
  return findAllPostsresult
 })

  const posts =  await postrepository.findAllPosts({})
 
  //1. findALL  몇번 실행됨?
  expect(postrepository.post.findAll)
  .toHaveBeenCalledTimes(1)

//2. posts가 findAllPosts과 동일한지
expect(postrepository.post.findAll).toHaveBeenCalledWith();
})

})


// import UserRepository from "../../../database/repositories/user";
// import { Op } from "sequelize";

// const mockUserModel = () => ({
//   findOne: jest.fn(),
//   create: jest.fn(),
// });
// describe("userRository Layer Text",() => {
//   //인스턴스화 시킴
// let usersrepository = new UserRepository()
// //시퀄라이즈 모델을 모킹함
// usersrepository.User = mockUserModel()



//  beforeEach(()=>{
//   //모든mock을 리셋한다.
//   jest.resetAllMocks()
//  })


// test("findOne method 호출",async ()=>{
//   const ID = 'afsdaf'

// // usersrepository.User.findOne = (option)=>{
// //   if (Object.hasOwn(option,'where'))return true
// //   return false
// // }

//  const user = await usersrepository.findOne(ID)
// // console.log(usersrepository.User.findOne)
// //findOne 메소드가 몇번 작동하는가?
// expect(usersrepository.User.findOne).toHaveBeenCalledTimes(1);
// //findOne 메소드가 호출된 메소드를 검사합니다
// expect(usersrepository.User.findOne).toHaveBeenCalledWith({
//   where: { 
//       [Op.or]: [
//           { userId: ID },
//           { nickname: ID }
//       ]
//   },
// })

// });

// test("createOne method 호출", async()=>{
//   const  ID = {
//     "nickname" : "sdf",
//     "password" : "1234"
//   }                                     //어떤 메소드를 검사할꺼니?
//   const users = await usersrepository.createOne(ID)
//  //create method 몇번 호출 하는가?
//   expect(usersrepository.User.create).toHaveBeenCalledTimes(1);
//    //create 메소드가 호출된 인자를 검증                    //인자 확인
//   expect(usersrepository.User.create).toHaveBeenCalledWith(ID)
  
// })
// })