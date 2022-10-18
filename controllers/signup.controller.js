const SignupService = require('../services/signup.service')
// const { InvalidParamsError } = require('../exceptions/index.exception');
 //parms만 유효성 검사를 한다.

//exports
class SignupController  {
  signupService = new SignupService()

  signup = async (req,res) =>{
    try{
      //로그인 했는지 인증을 여기서???
      if(req.cookies.token){ //로그인 중복 검사 쿠키에 받아옴 
        res.status(401).send({
        errorMessage : '이미 로그인이 되어있습니다.'
        })
        return;
        }
      const {nickname, password,confirm} = req.body
  //값이 하나라도 없으면 index.exception에 있는 에러를 보내줌
  if(!nickname || !password || !confirm){
    res.status(400).send({
      errorMessage: "닉네임 패스워드를 확인하세요",
    })
    return;
  }
  //다 통과하면 서비스쪽으로 정보를 보내준다
  const signupUser = await this.signupService.signup({nickname , password,confirm})
  console.log(signupUser,"컨트롤러12")
    res.status(201).json({data : signupUser})
    //정보확인후 클라에게 보여줌
  }catch(error) {
      console.log(error)
      res.status(error.status || 400);
      res.json({errorMessage : error.message})
  }
 }
}
module.exports = SignupController