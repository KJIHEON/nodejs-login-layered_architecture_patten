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
  //토큰을 발급 한다 해당하는 사용자의 아이디가 일치하게끔 만들어준다
  const accessToken = createAccessToken(id);
  //실제 사용자가 서버에서 확인 받은 사람이 맞는지 확인
  const refreshToken = createRefreshToken();
//발급 받았다면 토큰 오브젝트 전역변수에 refreshToken 키값을 가지고 id를 밸루로 가진다.
  tokenObject[refreshToken] = id; // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장합니다.
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

  return accessToken;
}

// Refresh Token을 생성합니다.
function createRefreshToken() {
  //E따로 저장은하지 않지만 서버에 저장함
  const refreshToken = jwt.sign(
    {}, // JWT 데이터
    process.env.SECRET_KEY, // 비밀키
    { expiresIn: '7d' }) // Refresh Token이 7일 뒤에 만료되도록 설정합니다.

  return refreshToken;
}

// app. js

//검증
app.get("/", (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(400).json({ "message": "Refresh Token이 존재하지 않습니다." });
  if (!accessToken) return res.status(400).json({ "message": "Access Token이 존재하지 않습니다." });

  const isAccessTokenValidate = validateAccessToken(accessToken);
  const isRefreshTokenValidate = validateRefreshToken(refreshToken);

  if (!isRefreshTokenValidate) return res.status(419).json({ "message": "Refresh Token이 만료되었습니다." });


  if (!isAccessTokenValidate) {
    const accessTokenId = tokenObject[refreshToken];
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
  try {
    jwt.verify(accessToken, SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Refresh Token을 검증합니다.
function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accessToken) {
  try {
    const payload = jwt.verify(accessToken, SECRET_KEY); // JWT에서 Payload를 가져옵니다.
    return payload;
  } catch (error) {
    return null;
  }
}
module.exports = app
