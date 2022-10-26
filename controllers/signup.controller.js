const SignupService = require('../services/signup.service')
const { ValidationError } = require('../exceptions/index.exceptions');
 //parms만 유효성 검사를 한다.

//exports
class SignupController  {
  signupService = new SignupService()

  signup = async (req,res,next) =>{
    try{
      //로그인 했는지 인증을 여기서???
  //다 통과하면 서비스쪽으로 정보를 보내준다
  const {nickname , password} = req.body
  console.log(nickname , password)
  const signupUser = await this.signupService.signup({nickname , password})
    res.status(201).json({data : signupUser})
    //정보확인후 클라에게 보여줌
  }catch(error) {
     next(error)
  }
 }
}
module.exports = SignupController