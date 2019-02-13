var express = require('express');
var router = express.Router();
var wakatime = require('../controllers/wakatime');
const passport = require('passport');

router.post(
  '/ping',
  passport.authenticate('bearer', {session: false}),
  wakatime.ping,
);

module.exports = router;
