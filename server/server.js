const express = require('express');


const app = express();
const port = 3000;

const bodyParser = require('body-parser');


// Routes:
const auth = require('./routes/authRoutes.js');
const stock = require('./routes/stockRoutes.js');

// Body Parser-
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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


app.listen(port, () => console.log(`Example app listening on port ${port}!`))