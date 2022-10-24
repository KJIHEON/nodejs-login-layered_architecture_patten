
const LoginSevice = require('../services/login.sevice')
const {} = require('../exceptions/index.exceptions')

class LoginController{
loginsevice =  new LoginSevice()

login = async (req,res,next)=>{
try{
  //닉네임 패스워드가 없을시 에러 반환
  //로그인 했는지 인증을 여기서???
  if(req.cookies.token){ //로그인 중복 검사 쿠키에 받아옴 
    throw new ValidationError({
      errorMessage : '이미로그인 되어 있습니다.' })
    }
  const {nickname, password} = req.body
  if(!nickname || !password) {
    throw new ValidationError({
      errorMessage : '닉네임 패스워드를 확인하세요' })
  }
  //서비스에서 리턴한 토큰을 받아서 보내준다.
const loginUser = await this.loginsevice.login({nickname,password})

res.cookie('token',loginUser)
res.status(200).send({'token':loginUser})
}catch(error) {
 next(error)
}
}
}
module.exports = LoginController