const express = require('express');
const router = express.Router();
const signupRouter = require('./signup.routes');
const postsRouter = require('./posts.routes');
const loginRouter = require('./login.routes');

router.use('/signup', signupRouter);
router.use('/login', loginRouter)
router.use('/posts', postsRouter);


module.exports = router;
