const express = require('express');


const app = express();
const port = 3000;

const bodyParser = require('body-parser');


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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))