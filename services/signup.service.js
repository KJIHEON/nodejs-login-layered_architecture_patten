const SignuprePository= require('../repositories/signup.repository')
// const {ValidationError} = require('../exceptions/index.exceptions')
const bcrypt = require('bcrypt')
require("dotenv").config(); 
class SignupService {
  signupRepository = new SignuprePository() //변수를 선언한후 Postrepositorie인스턴스로 할당
//저장소에 요청
signup = async({nickname , password}) => {


  //비밀 번호 암호화
  /// bcrypt.genSaltSync(숫자여야함(돌릴 횟수))
  const salt = bcrypt.genSaltSync(Number(process.env.salt)) ;
  //  bcrypt.hashSync(암호화할 데이터, salt) 비밀 번호를 암호화 하겠다
  password = bcrypt.hashSync(password, salt)
  
  const signupUser = await this.signupRepository.signup({nickname , password})
  return signupUser
}
}

module.exports = SignupService;