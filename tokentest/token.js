require("dotenv").config(); //.env 임포트
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(cookieParser());

let tokenObject = {}; // Refresh Token을 저장할 Object

app.post("/:id", (req, res) => {
  //아이디 값을 가지고 변수에 할당
  const id = req.params.id;
  console.log(id,"d아이디여ㅛ")
  //토큰을 발급 한다 해당하는 사용자의 아이디가 일치하게끔 만들어준다
  const accessToken = createAccessToken(id);
  console.log(accessToken,"에쎼스 ㅌㅋㅋ")
  //실제 사용자가 서버에서 확인 받은 사람이 맞는지 확인
  const refreshToken = createRefreshToken();
  console.log(refreshToken,"리프레쉿ㅅㅅㅅㅅ")
//발급 받았다면 토큰 오브젝트 전역변수에 refreshToken 키값을 가지고 id를 밸루로 가진다.
  tokenObject[refreshToken] = id; 
  console.log(tokenObject[refreshToken],"11111111111111111122222222222")// Refresh Token을 가지고 해당 유저의 정보를 서버에 저장합니다.
  res.cookie('accessToken', accessToken); // Access Token을 Cookie에 전달한다.
  res.cookie('refreshToken', refreshToken); // Refresh Token을 Cookie에 전달한다.

  return res.status(200).send({ "message": "Token이 정상적으로 발급되었습니다." });
})

// Access Token을 생성합니다.
function createAccessToken(id) {
  //id를 받아서 jwt 싸인이라는 함수를 사용
  const accessToken = jwt.sign(
    { id: id }, // JWT 데이터
    process.env.SECRET_KEY, // 비밀키
    { expiresIn: '10s' }) // Access Token이 10초 뒤에 만료되도록 설정합니다.
console.log(accessToken,"ㅇㅇㅇㅇㅇㅇㅇ여기예요 발급")
  return accessToken;
}

// 1.Refresh Token을 생성합니다.
function createRefreshToken() {
  //E따로 저장은하지 않지만 서버에 저장함
  const refreshToken = jwt.sign(
    {}, // JWT 데이터
    process.env.SECRET_KEY, // 비밀키
    { expiresIn: '7d' }) // Refresh Token이 7일 뒤에 만료되도록 설정합니다.
console.log(refreshToken,"여기예요 리프레쉬")
  return refreshToken;
}

// app. js

//검증
app.get("/", (req, res) => {
  //쿠키에 담긴 정보를 받아온다
  const accessToken = req.cookies.accessToken;
  console.log(accessToken,"에쏏ㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅ")
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken,"리프레쉬 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ")
  if (!refreshToken) return res.status(400).json({ "message": "Refresh Token이 존재하지 않습니다." });
  if (!accessToken) return res.status(400).json({ "message": "Access Token이 존재하지 않습니다." });

  const isAccessTokenValidate = validateAccessToken(accessToken);
  const isRefreshTokenValidate = validateRefreshToken(refreshToken);
  // console.log(isAccessTokenValidate == null,"검증후 에쎄")
  // console.log(isRefreshTokenValidate == null,"검증후 리프레쉬")
  if (!isRefreshTokenValidate == null) return res.status(419).json({ "message": "Refresh Token이 만료되었습니다." });

  // console.log(refreshToken,"ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ")
  if (!isAccessTokenValidate) {
    const accessTokenId = tokenObject[refreshToken];
    // console.log(accessTokenId,"ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ")
    if (!accessTokenId) return res.status(419).json({ "message": "Refresh Token의 정보가 서버에 존재하지 않습니다." });

    const newAccessToken = createAccessToken(accessTokenId);
    res.cookie('accessToken', newAccessToken);
    return res.json({ "message": "Access Token을 새롭게 발급하였습니다." });
  }

  const { id } = getAccessTokenPayload(accessToken);
	return res.json({ "message": `${id}의 Payload를 가진 Token이 성공적으로 인증되었습니다.` });
})


// Access Token을 검증합니다.
function validateAccessToken(accessToken) {
  console.log(accessToken,"에쎼스 토큰 검증 하기")
  try {
    jwt.verify(accessToken, process.env.SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Refresh Token을 검증합니다.
function validateRefreshToken(refreshToken) {
  console.log(refreshToken,"리프레쉬 토큰 검증")
  try {
    jwt.verify(refreshToken, process.env.SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accessToken) {
  console.log(accessToken,"에쎼쓰토큰")
  try {
    const payload = jwt.verify(accessToken, process.env.SECRET_KEY); // JWT에서 Payload를 가져옵니다.
    return payload;
  } catch (error) {
    return null;
  }
}
module.exports = app
