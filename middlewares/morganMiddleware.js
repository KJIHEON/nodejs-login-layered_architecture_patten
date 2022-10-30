const morgan = require('morgan');
const logger = require('../config/winston');

// 참고 : https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342

// 스트림 메서드를 Override 합니다.
// 모건으로 콘솔로그를 대체합니다.
const stream = {
  // Use the http severity
  write: (message) => {
    logger.http(message);
  },
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development'; //process.env.NODE_ENV
  return env !== 'development';
};

// https://jeonghwan-kim.github.io/morgan-helper/
morgan.token('status', function (req, res) {
  let color;

  if (res.statusCode < 300) color = '\x1B[32m'; //green
  else if (res.statusCode < 400) color = '\x1B[36m'; //cyan
  else if (res.statusCode < 500) color = '\x1B[33m'; //yellow
  else if (res.statusCode < 600) color = '\x1B[31m'; //red
  else color = '\033[0m'; /*글자색 초기화*/

  return color + res.statusCode + '\033[35m' /*보라색*/;
});

// body에 담아서 보내준 값을 보여줄 수 있게 해주는 곳. req을 까보자!
// https://jeonghwan-kim.github.io/morgan-helper/
morgan.token('request', function (req, res) {
  return 'Request_' + JSON.stringify(req.body);
});

//장난질.
morgan.token('makeLine', function () {
  let line = "-----------------------------------------------*(੭*ˊᵕˋ)੭* 응답 결과 ╰(*'v'*)╯-----------------------------------------------"
  let blank = "                                   ";
  return line + "\n" + blank;
});

// Build the morgan middleware
// morgan 함수의 인자(format)로는 short, dev, common, combined 가 올 수 있다. (정보의 노출 수준)
// 보통 배포시에는 combined 혹은 common 에 필요한 정보들을 추가하여 사용하는 것을 추천 || 추후 배포 시 사용 -> 주소,IP_ :remote-addr :remote-user |
const morganMiddleware = morgan(
  ":makeLine 요청_:method | url_':url' | :request | Status_:status | 응답시간_:response-time ms (:res[content-length]줄)",
  { stream, skip }
);

module.exports = morganMiddleware;