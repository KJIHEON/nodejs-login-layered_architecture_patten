const jwt = require('jsonwebtoken')
const { User } = require("../models");
require("dotenv").config(); //.env 임포트
const {SECRET_KEY} = process.env 

  module.exports = (req, res, next) => {
    const { token } = req.cookies //쿠키에 있는 토큰을 받아옴
    console.log(!token)
 if (!token){ //토큰이 없을시 예외처리
  res.status(401).send({
    errorMessage : '로그인이 필요한 기능입니다.'
  })
  return;
}
try { //검증
  const { userId } = jwt.verify(token, SECRET_KEY);  //시크릿 키값으로 토큰을 검증함
  User.findByPk(userId).then((user) => {
    res.locals.user = user; //res.locals.user데이터를 담는다 가상공간에
    next();
  });
} catch (error) {
  res.status(401).send({
    errorMessage: "로그인 후 이용 가능한 기능입니다.",
  });
}
}
//z클라이언트에서 보내줄때 사용
  //   const { authorization } = req.headers;
  //   // console.log(req.headers,"미들")
  //   const [authType, authToken] = (authorization || '').split(' ');
  //   if (!authToken || authType !== 'Bearer') {
  //     return res.status(401).send({
  //       errorMessage: '로그인 후 이용 가능한 기능입니다.',
  //     });
  //   }
  
  //   try {
  //     const { userId } = jwt.verify(authToken, SECRET_KEY);
  //     User.findByPk(userId).then((user) => {
  //       res.locals.user = user;
  //       next();
  //     });
  //   } catch (err) {
  //     res.status(401).send({
  //       errorMessage: '로그인 후 이용 가능한 기능입니다.',
  //     });
  //   }
  // };


