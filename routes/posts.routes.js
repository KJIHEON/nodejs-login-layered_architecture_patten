const express = require('express');
const router = express.Router();
//PostController를 불러들이기 위해서 사용함
const postController = require("../controllers/posts.controller")
const PostController = new postController()


router.get = ('/',PostController.getPost)
module.exports = router;

