const LoginrePository = require('../repositories/login.repository')
const jwt = require('jsonwebtoken')
const {ValidationError} = require('../exceptions/index.exceptions')
const bcrypt = require('bcrypt')

class LoginSevice{
    loginrepository = new LoginrePository()

login = async ({nickname, password})=>{

    //저장소에 정보를 보내준다// 저장소의 리턴값을 받아온다
    const user = await this.loginrepository.login({nickname})
    //패스워드 복호화후 검증
    const encryptedPassword = bcrypt.compareSync(password,user.password)
    // console.log(encryptedPassword,"복호화 확인하기")
    if(!user || encryptedPassword == false){
      throw new ValidationError("유저가 없거나 비밀번호가 일치하지 않습니다.")}
    //토큰을 만들어서 보내준다
    const token = jwt.sign({userId : user.userId },"key",{expiresIn : 3600})
    console.log(token)
    return token
}
}
module.exports = LoginSevice