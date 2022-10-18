const { User } = require('../models')

class LoginRepository{


  login = async({nickname})=>{
    //서비스에서 받은 닉네임을 찾아서 서비스로 보내줌
    const loginUser = await User.findOne({nickname})
    return loginUser
}

}
module.exports = LoginRepository