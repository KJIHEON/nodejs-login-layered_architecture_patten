const { User } = require("../models");
const {ValidationError} = require('../exceptions/index.exceptions')
module.exports= async (req,res,next)=>{
 
try { //검증
const {password,nickname,confirm} = req.body
if(req.cookies.token){ //로그인 중복 검사 쿠키에 받아옴 
  throw new ValidationError(
   '이미 로그인이 되어있습니다.'
    )
    }
    //회원가입 유효성 검사
  //  const user_Signup = Joi.object({ //문자열에 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)
  //     nickname : Joi.string().required(),
  //     password : Joi.string().min(4),     //최소 4 (new RegExp('^[a-zA-Z0-9]{3,30}$'))
  //     confirm : Joi.string().min(4) //최소4
  //   })
  //   //정보를 body로 불러와서 확인함
  //   const { nickname , password , confirm} = await user_Signup.validateAsync(req.body);  //정보를 받아옴  user_Signup.validateAsync 
  
if (password == nickname){  //비밀번호 닉네임 중복검사
  throw new ValidationError(
    "비밀번호가 닉네임과 일치합니다."
    )

  }
if (password !== confirm){ //비밀번호 검증
  throw new ValidationError(
    "비밀번호가 일치하지 않습니다.",
    )
  } 
  const users = await User.findAll({ //조건을 걸어 같은 닉네임이 있는걸 가져옴
    where : {
     nickname,
    }
   });
  console.log(users.length)
if (users.length){ //닉네임 중복검사 길이로 비교해서 있으면 중복된 닉네임
   throw new ValidationError("중복된 닉네임입니다.",
     )
}
next()
} catch (error) {
next(error)
}
};

