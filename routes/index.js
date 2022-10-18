const express = require('express');
const router = express.Router();
const signupRouter = require('./signup.routes');
const postsRouter = require('./posts.routes');

router.use('/posts', postsRouter);
router.use('/signup', signupRouter);



module.exports = router;
