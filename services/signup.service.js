const SignuprePository= require('../repositories/signup.repository')

class SignupService {
  signupRepository = new SignuprePository() //변수를 선언한후 Postrepositorie인스턴스로 할당
//저장소에 요청
signup = async({nickname , password,confirm}) => {
  //어플리케이션의 핵심적인 비즈니스 로직을 수행하여(가공) 클라이언트들의 요구사항을 
  //반영하여 원하는 결과를 반환해주는 계층입니다
if (password == nickname){  //비밀번호 닉네임 중복검사
  throw new Error("비밀번호와 닉네임이 일치합니다.!")
  }
  
if (password !== confirm){ //비밀번호 검증
  //throw new Error()
  throw new Error("비밀번호가 맞지 않습니다.")
  }
  //등록된
  const findUser = await this.signupRepository.findUser({nickname})
  if(findUser.length){
  throw new Error("중복된 닉네임 입니다.")
  }
  
const signupUser = await this.signupRepository.signup({nickname , password})
return signupUser
}  
}

module.exports = SignupService;