const express = require('express');

const router = express.Router();
const passport = require('passport');

const stockController = require('../controller/stockController');

// Handle the google redirect
router.get('/google/callback', passport.authenticate('google'), stockController.getLoginPortfolio, (req, res) => {
  // handle with passport
  res.status(200).json(res.locals);
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
