const express = require('express');
const router = express.Router();
//PostController를 불러들이기 위해서 사용함
const authmiddleware = require("../middlewares/auth-middleware")
const commentsController = require("../controllers/comments.controller")
const CommentsController = new commentsController()


router.post('/:postId',authmiddleware,CommentsController.ceratecomments)

module.exports = router;