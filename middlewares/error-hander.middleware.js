const errorLogger = (error, request, response, next) => {
  console.error(error);
  next(error); // errorLogger -> errorHandler
};
//에러 핸들러를 사용
const errorHandler = (error, req, res, next) => {
              //error.status가 있을때 ||없으면  400 반환 
  const status = error.status || 400;
  res.status(status);
  //해당하는 error메세지를 띄워준다.
  res.json({ errorMessage: error.message });
};
//밖으로 내보내준다ㄴ
module.exports = { errorLogger, errorHandler };
