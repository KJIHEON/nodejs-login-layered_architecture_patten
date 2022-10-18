// class InvalidParamsError extends Error {
//   //에러 메세지와 스테이터스를 생성함 데이터가 잘못 되었을떄
//   constructor(message, status) {
//     //생성한 메세지를 상속받아 사용
//     super(message);
//     this.status = status || 409;
//     this.name = 'InvalidParamsError';
//     if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
//   }
// }
// //유효성 검사 에러
// class ValidationError extends Error {
//   constructor(message, status) {
//     super(message);
//     this.status = status || 412;
//     this.name = 'ValidationError';
//   }
// }

// module.exports = { InvalidParamsError, ValidationError };
