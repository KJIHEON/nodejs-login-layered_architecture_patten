const { User } = require('../models')

class LoginRepository{


  login = async({nickname})=>{
    //서비스에서 받은 닉네임을 찾아서 서비스로 보내줌
    return await User.findOne({where :{nickname}})
}
  }
module.exports = LoginRepository