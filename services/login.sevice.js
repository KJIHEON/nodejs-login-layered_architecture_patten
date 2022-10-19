const LoginrePository = require('../repositories/login.repository')
const jwt = require('jsonwebtoken')
const {ValidationError} = require('../exceptions/index.exceptions')

class LoginSevice{
    loginrepository = new LoginrePository()

login = async ({nickname, password})=>{
    try{

    //저장소에 정보를 보내준다// 저장소의 리턴값을 받아온다
    const user = await this.loginrepository.login({nickname})
    //닉네임 패스워드 검증
    console.log(password == user.password)
    if(!user || password !== user.password){
      throw new ValidationError("유저가 없거나 비밀번호가 일치하지 않습니다.")
      // return res.status(400).send({errorMessage : "유저가 없거나 비밀번호가 일치하지 않습니다."})
    }
    //토큰을 만들어서 보내준다
    const token = jwt.sign({userId : user.userId },"key")
   console.log(token)
   console.log({token})
    return token
    }catch(error) {
    console.log(error)
  }
}
}
module.exports = LoginSevice