require('dotenv').config(); //.env 임포트
const { User } = require('../models');
let LoginSevice = require('../services/login.sevice');
const bcrypt = require('bcrypt');
LoginSevice = new LoginSevice();

module.exports = async (req, res, next) => {
  //쿠키로 받아온다.
  //쿠키파서로 못하니깐 헤더스로 해야함
  console.log('미들웨어 지나갑니다!!!');
  let userId;
  //헤더
  // req.headers.accesstoken
  // req.headers.refreshtoken
  //쿠키
  const accessToken = req.cookies.AccessToken;
  const refreshToken = req.cookies.RefreshToken;
  //토큰이 없다면~

  if (!accessToken)
    return res
      .status(400)
      .json({ message: 'Access Token이 존재하지 않습니다.' });
  //리프레쉬 토큰 확인하기
  if (!refreshToken)
    return res
      .status(400)
      .json({ message: 'RefreshToken이 존재하지 않습니다.' });
  //에쎄스 토큰 검증하기
  const decodeAccessToken = await LoginSevice.validateAccessToken(accessToken);
  //리프레쉬 토큰 검증(시크릿 키가 같은지)
  const decodeRefreshToken = await LoginSevice.validateRefreshToken(
    refreshToken
  );
  //검증해서 아이디값 가져오기
  userId = decodeRefreshToken.userId;

  //인증된 에쎄스 토큰이 없을시
  if (decodeAccessToken == null) {
    //에쎼쓰 토큰 안에 있는 유저정보로 디비에 저장된 유저정보 찾기
    const findUser = await User.findByPk(userId);

    //디비에서 찾아온 리프레쉬 토큰 복호화(내가 가지고 있는 리프레쉬(암호화전) 토큰이랑 디비에 저장되어있는거랑 같은지)
    const decodeRefreshToken = bcrypt.compareSync(
      refreshToken,
      findUser.RefreshToken
    );

    //위변조가 있거나 존재 하지 않을때 라고 가정했을때 예외 처리
    if (decodeRefreshToken == false) {
      return res
        .status(400)
        .json({ message: 'RefreshToken이 일치하지 않거나 만료 되었습니다.' });
    }

    //리프레쉬 정상에 AccessToken 만료시 재발급

    const AccessToken = await LoginSevice.createAccessTokenRe(userId);

    //쿠키로 보내줌
    res.cookie('AccessToken', AccessToken);

    //프론트에서 로컬 스토리지에 저장하기 위해 res에 보내줌
    //리프레쉬 토큰이 만료시
  }
  //유저정보를 찾아서 로컬스에 저장
  User.findByPk(userId).then((user) => {
    res.locals.user = user; //res.locals.user데이터를 담는다 가상공간에
    console.log(res.locals.user, 'next전 확인');
    next();
  });
};

// const { token } = req.cookies //쿠키에 있는 토큰을 받아옴
// console.log(!token)
// if (!token){ //토큰이 없을시 예외처리
// res.status(401).send({
// errorMessage : '로그인이 필요한 기능입니다.'
// })
// return;
// }
// try { //검증
// const { userId } = jwt.verify(token, process.env.SECRET_KEY);  //시크릿 키값으로 토큰을 검증함
// User.findByPk(userId).then((user) => {
// res.locals.user = user; //res.locals.user데이터를 담는다 가상공간에
// next();
// });
// } catch (error) {
// res.status(401).send({
// errorMessage: "로그인 후 이용 가능한 기능입니다.",
// });
// }
//리프레쉬 토큰 검증 api , 생성하고 디비에 저장, 암호화 해야함(해싱), 로그인할떄 디비 ㅡ 해싱한거 확인.

// z클라이언트에서 보내줄때 사용
//     const { authorization } = req.headers;
//     // console.log(req.headers,"미들")
//     const [authType, authToken] = (authorization || '').split(' ');
//     if (!authToken || authType !== 'Bearer') {
//       return res.status(401).send({
//         errorMessage: '로그인 후 이용 가능한 기능입니다.',
//       });
//     }

//     try {
//       const { userId } = jwt.verify(authToken, SECRET_KEY);
//       User.findByPk(userId).then((user) => {
//         res.locals.user = user;
//         next();
//       });
//     } catch (err) {
//       res.status(401).send({
//         errorMessage: '로그인 후 이용 가능한 기능입니다.',
//       });
//     }
//   };
