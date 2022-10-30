//정리는 외부에서 받은거 맨위로 그다음 내부 순으로하기
const express = require('express');
const app = express();
//패키지 설치
const cors = require("cors");
const cookieParser = require('cookie-parser'); //z쿠키파서는 인덱스 라우터를 걸쳐서 들어감 앞에다가 적어주기
const Router = require('./routes') 
const port = 3000;
const {errorHandler,errorLogger} = require('./middlewares/error-hander.middleware')
global.logger || (global.logger = require('./config/winston')); // → 윈스턴 로거를 전역에서 사용
const morganMiddleware = require('./middlewares/morganMiddleware');

app.use(morganMiddleware); // 콘솔창에 통신결과 나오게 해주는 것

app.use(cookieParser())
app.use(express.json()); //body-parser //기본적으로 디폴트 값이 설정되어있어서 읽을 수 없지만 바디 파서를 이용하여 정보를 읽을수 있게함


//프론트에게 열어줄떄 코로스 에러 제거
// 나중에 프론트에서 배포된 주소로 whitelist 추가할 것
let corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));


app.use(Router);
// 에러발생시 errorLogger로 넘어온다
app.use(errorLogger)
//errorLogger를 넘어와서 errorHandler로 넘어온다.
app.use(errorHandler)

app.listen(port,() =>{
    console.log('port 3000')
});
