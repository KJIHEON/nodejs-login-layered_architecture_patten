//정리는 외부에서 받은거 맨위로 그다음 내부 순으로하기
const express = require('express');
const app = express();
//패키지 설치
const cors = require("cors");
const cookieParser = require('cookie-parser'); //z쿠키파서는 인덱스 라우터를 걸쳐서 들어감 앞에다가 적어주기
const Router = require('./routes') 
const port = 3000;
const {errorHandler,errorLogger} = require('./middlewares/error-hander.middleware')

// const {errorLogger, errorHandler} = require('./middlewares/error-hander.middleware')
app.use(cookieParser())
app.use(express.json()); //body-parser //기본적으로 디폴트 값이 설정되어있어서 읽을 수 없지만 바디 파서를 이용하여 정보를 읽을수 있게함


//프론트에게 열어줄떄 코로스 에러 제거
app.use(
  cors({
    origin: 'http://127.0.0.1:3000/',
    credential: true,
  })
);


app.use(Router);
// 에러발생시 errorLogger로 넘어온다
app.use(errorLogger)
//errorLogger를 넘어와서 errorHandler로 넘어온다.
app.use(errorHandler)

app.listen(port,() =>{
    console.log('port 3000')
});
