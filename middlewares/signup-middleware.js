const { User } = require("../models");
const Joi = require("joi"); 

module.exports= async (req,res,next)=>{
 
try { //검증

if(req.cookies.token){ //로그인 중복 검사 쿠키에 받아옴 
    res.status(401).send({
    errorMessage : '이미 로그인이 되어있습니다.'
    })
    return;
    }
    //회원가입 유효성 검사
  //  const user_Signup = Joi.object({ //문자열에 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)
  //     nickname : Joi.string().required(),
  //     password : Joi.string().min(4),     //최소 4 (new RegExp('^[a-zA-Z0-9]{3,30}$'))
  //     confirm : Joi.string().min(4) //최소4
  //   })
  //   //정보를 body로 불러와서 확인함
  //   const { nickname , password , confirm} = await user_Signup.validateAsync(req.body);  //정보를 받아옴  user_Signup.validateAsync 
    console.log(nickname , password , confirm,"미들웨어")
  
if (password == nickname){  //비밀번호 닉네임 중복검사
    res.status(400).send({
      errorMessage: "비밀번호가 닉네임과 일치합니다.",
    })
    return;
  }
if (password !== confirm){ //비밀번호 검증
    res.status(400).send({
      errorMessage: "비밀번호가 일치하지 않습니다.",
    })
    return;
  } 
  const users = await User.findAll({ //조건을 걸어 같은 닉네임이 있는걸 가져옴
    where : {
     nickname,
    }
   });
  console.log(users.length)
if (users.length){ //닉네임 중복검사 길이로 비교해서 있으면 중복된 닉네임
     res.status(400).send({
       errorMessage: "중복된 닉네임입니다.",
     })
     return;
}
next();
} catch (error) {
  res.status(401).send({
    errorMessage: "로그인 후 이용 가능한 기능입니다.",
  });
}
};

