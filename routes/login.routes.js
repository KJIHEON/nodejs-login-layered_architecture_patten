const express = require('express');
const router = express.Router();
//PostController를 불러들이기 위해서 사용함
const loginController = require("../controllers/login.controller")
const LoginController = new loginController()

console.log("1")
router.post('/',LoginController.login)
module.exports = router;  
