const express = require('express');


const app = express();
const port = 3000;

const bodyParser = require('body-parser');

// Passport JS setup
const cookieSession = require('cookie-session');
const passport = require('passport');

const passportSetup = require('./config/passport-setup');


// Routes:
const auth = require('./routes/authRoutes.js');
const stock = require('./routes/stockRoutes.js');
const keys = require('./config/keys.js');

// Body Parser-
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cookie Properties: encrypts cookie and makes it a day long
app.use(cookieSession({
  maxAge: 24,
  keys: [keys.session.cookieKey],
}));

// initalize passport
app.use(passport.initialize());
app.use(passport.session());

// Flow Test;
app.use((req, res, next) => {
  console.log(`
      **FLOW TEST**
      ${req.url} - URL
      ${req.method} - Method
      ${req.body} - Body
      `);
  // res.send('hello world');
  next();
});


// Auth Routes: This will handle all functionality related to auth
app.use('/api/auth/', auth, (req, res) => {
  res.send('This is the login routes');
});


// Stock Routes: This will all other functionality related to Stocks
app.use('/api/stock/', stock, (req, res) => {
  res.send('This is the stock routes');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));