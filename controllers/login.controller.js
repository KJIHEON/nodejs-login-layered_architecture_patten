
const LoginSevice = require('../services/login.sevice')
// const {ValidationError} = require('../exceptions/index.exceptions')
require("dotenv").config(); //.env 임포트
class LoginController{
loginsevice =  new LoginSevice()

// login = async (req,res,next)=>{
// try{
//   닉네임 패스워드가 없을시 에러 반환
//   로그인 했는지 인증을 여기서???
//   if(req.cookies.token){ //로그인 중복 검사 쿠키에 받아옴 
//     throw new ValidationError("이미로그인 되어 있습니다.")
//     }
//   const {nickname, password} = req.body
//   if(!nickname || !password) {
//     throw new ValidationError('닉네임 패스워드를 확인하세요')
//   }
//   //서비스에서 리턴한 토큰을 받아서 보내준다.
// const loginUser = await this.loginsevice.login({nickname,password})

// res.cookie('token',loginUser)
// res.status(200).send({'token':loginUser})
// }catch(error) {
//  next(error)
// }
// }

// 리프레쉬
login = async (req,res,next)=>{
  try{
    const {nickname, password} = req.body
    const RefreshToken = await this.loginsevice.createRefreshToken({nickname,password})
    const AccessToken = await this.loginsevice.createAccessToken({nickname,password})
    //AccessToken의 
    // res.cookie('AccessToken',`Bearer ${AccessToken}`) // Access Token을 Cookie에 전달한다.
    // res.cookie('RefreshToken',`Bearer ${RefreshToken}`);  //Bearer 리프레쉬 토큰
    res.cookie('AccessToken',AccessToken) // Access Token을 Cookie에 전달한다.
    res.cookie('RefreshToken',RefreshToken); 
    res.status(200).send({"message": "Token이 정상적으로 발급되었습니다.",AccessToken,RefreshToken})
  }catch(error) {
   next(error)
  }
  }
}

module.exports = LoginController