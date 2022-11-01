const express = require('express');
const router = express.Router();
const signupRouter = require('./signup.routes');
const postsRouter = require('./posts.routes');
const loginRouter = require('./login.routes');
const conmmentsRouter = require('./comments.routes');
const likesRouter = require('./likes.routes');
const tokentest = require('../tokentest/token');
const kakao = require('./kakao.routes');

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/posts', likesRouter);
router.use('/posts', postsRouter);
router.use('/comments', conmmentsRouter);
//리프레쉬 토큰 에세스 토큰 연습
router.use('/token', tokentest);
router.use('/kakao', kakao);
module.exports = router;
