
const LoginSevice = require('../services/login.sevice')


class LoginController{
loginsevice =  new LoginSevice()

login = async (req,res)=>{
try{
  //닉네임 패스워드가 없을시 에러 반환
  const {nickname, password} = req.body
  if(!nickname || !password) {
    throw new Error("닉네임 패스워드를 확인하세요")
  }
  //서비스에서 리턴한 토큰을 받아서 보내준다.
const loginUser = await this.loginsevice.login({nickname,password})
console.log(loginUser,"컨트롤러 쿠키 확인")
res.cookie('token',loginUser)
res.status(200).send({'token':loginUser})
}catch(error) {
  console.log(error)
  res.status(error.status || 400);
  res.json({errorMessage : error.message})
}
}
}
module.exports = LoginController