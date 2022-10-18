const express = require('express');
const router = express.Router();
const signupRouter = require('./signup.routes');
const postsRouter = require('./posts.routes');
const loginRouter = require('./login.routes');
const conmmentsRouter = require('./comments.routes');

router.use('/signup', signupRouter);
router.use('/login', loginRouter)
router.use('/posts', postsRouter);
router.use('/comments', conmmentsRouter);


module.exports = router;
