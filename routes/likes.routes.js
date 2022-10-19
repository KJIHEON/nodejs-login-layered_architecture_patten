const express = require('express');
const router = express.Router();
const authmiddleware = require("../middlewares/auth-middleware")
//PostController를 불러들이기 위해서 사용함
const likesController = require("../controllers/likes.controller")
const LikesController = new likesController()

router.put('/:postId/like',authmiddleware,LikesController.likes)
router.get('/like',authmiddleware,LikesController.findpost)
module.exports = router;  