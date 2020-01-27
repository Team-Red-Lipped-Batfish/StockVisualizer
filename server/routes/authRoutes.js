const express = require('express');

const router = express.Router();
const passport = require('passport');


// Handle the google redirect
router.get('/google/callback', passport.authenticate('google'), (req, res, next) => {
  // handle with passport
  next();
});

//login with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/logout', (req, res, next) => {
  // handle with passport
  next();
})

module.exports = router;
