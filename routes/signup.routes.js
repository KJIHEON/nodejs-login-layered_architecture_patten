const express = require('express');
const router = express.Router();
//컨트롤러에 있는 클래스를 가져온다.
const signupController = require("../controllers/signup.controller");
const SignupController = new signupController() //클래스를 인스턴스로 만들어준다


router.post('/',SignupController.signup)
module.exports = router;
