const LoginRepository = require('../repositories/login.repository')
const SignupRepository = require('../repositories/signup.repository')
const jwt = require('jsonwebtoken')
const {ValidationError} = require('../exceptions/index.exceptions')
const bcrypt = require('bcrypt')
require("dotenv").config()

class LoginSevice{
    loginrepository = new LoginRepository()
    signuprepository = new SignupRepository()

// login = async ({nickname, password})=>{
//     //저장소에 정보를 보내준다// 저장소의 리턴값을 받아온다
//     const user = await this.loginrepository.login({nickname})
//     //패스워드 복호화후 검증
//     const encryptedPassword = bcrypt.compareSync(password,user.password)
//     // console.log(encryptedPassword,"복호화 확인하기")
//     if(!user || encryptedPassword == false){
//       throw new ValidationError("유저가 없거나 비밀번호가 일치하지 않습니다.")}
//     //토큰을 만들어서 보내준다
//     const token = jwt.sign({userId : user.userId },process.env.SECRET_KEY,{expiresIn : 3600})
//     console.log(token)
//     return token
// }

//에세스 토큰 발급
createAccessToken = async ({nickname,password})=>{
  //유저 정보 확인
  const user = await this.loginrepository.login({nickname})
  //암호화
  const encryptedPassword = bcrypt.compareSync(password,user.password)
  if(!user || encryptedPassword == false){
    throw new ValidationError("유저가 없거나 비밀번호가 일치하지 않습니다.")}
  //에쎼쓰 토큰 발급
  const AccessToken = jwt.sign({userId : user.userId },process.env.SECRET_KEY,{ expiresIn: '10s' })
  return AccessToken
}

//리프레쉬 토큰 발급
createRefreshToken = async ({nickname,password})=>{
  //유저정보 확인
  const user = await this.loginrepository.login({nickname})
  //비밀 번호 복호화
  const encryptedPassword = bcrypt.compareSync(password,user.password)
  //비밀 번호 일치 하는지 검사
  if(!user || encryptedPassword == false){
    throw new ValidationError("유저가 없거나 비밀번호가 일치하지 않습니다.")}
    //리프레쉬 발급
    const refreshToken = jwt.sign({userId : user.userId },process.env.SECRET_KEY,{ expiresIn: '7d' }) // Refresh Token이 7일 뒤에 만료되도록 설정합니다.
    //리프레쉬 암호화
    const salt = bcrypt.genSaltSync(Number(process.env.salt))
    const RefreshToken = bcrypt.hashSync(refreshToken,salt)
    //리프레쉬 저장
    await this.signuprepository.updaterefreshToken({nickname,RefreshToken})
    return refreshToken
  }
   //에세스 토큰 검증
   validateAccessToken = async(accessToken)=>{
    try {
      return jwt.verify(accessToken, process.env.SECRET_KEY); // JWT에서 Payload를 가져옵니다.
    } catch (error) {
      return null;
    }
  }
  //리프레쉬 토큰 검증
  validateRefreshToken = async(refreshToken)=>{
    try {
      return jwt.verify(refreshToken, process.env.SECRET_KEY); // JWT를 검증합니다.
    } catch (error) {
      return false;
    }
  }
  //에세스 토큰 재발급
  createAccessTokenRe = async (userId)=>{
    return jwt.sign({userId : userId },process.env.SECRET_KEY,{ expiresIn: '10s' }) // JWT에서 Payload를 가져옵니다.
    }

// login = async ({nickname, password})=>{
//     //저장소에 정보를 보내준다// 저장소의 리턴값을 받아온다
//     const user = await this.loginrepository.login({nickname})
//     //패스워드 복호화후 검증
//     const encryptedPassword = bcrypt.compareSync(password,user.password)
//     // console.log(encryptedPassword,"복호화 확인하기")
//     if(!user || encryptedPassword == false){
//       throw new ValidationError("유저가 없거나 비밀번호가 일치하지 않습니다.")}
//     //토큰을 만들어서 보내준다
//     const token = jwt.sign({userId : user.userId },process.env.SECRET_KEY,{expiresIn : 3600})
//     console.log(token)
//     return token
// }
}
module.exports = LoginSevice