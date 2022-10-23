const { User } = require('../models')
 //parms만 유효성 검사를 한다.
class SignupRepository {

  //유저 정보 저장하기
  signup = async ({ nickname , password})=>{
    //서비스에게 받은 정보를 디비에 저장하는 계층
    //실제 디비로 저장하기 때문에 시퀄라이즈 문법 사용
    return await User.create({ nickname , password}) //create(nickname , password)

  }
    //중복 유저 찾기
  findUser = async({nickname}) =>{
    return await User.findAll({where : {nickname}})

   }
   
  
}

module.exports = SignupRepository;