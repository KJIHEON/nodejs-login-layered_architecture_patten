const express = require('express');
const router = express.Router();
//PostController를 불러들이기 위해서 사용함
const authmiddleware = require("../middlewares/auth-middleware")
const postController = require("../controllers/posts.controller")
const PostController = new postController()


router.get('/',PostController.getPost)
router.post('/',authmiddleware,PostController.createPost)
router.get('/:postId',PostController.getfindById) 
router.put('/:postId',PostController.updatePost)
module.exports = router;

