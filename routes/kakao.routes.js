const express = require('express');
const router = express.Router();
const passport = require('passport');
const kakao = require('../passport/kakao');

router.post('/', kakao);
router.post('/callback');
module.exports = router;
