const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const archive = require('./routes/archive');
const bugsnag = require("bugsnag");
const app = express();

app.use('/archive', archive);
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 8200;

app.listen(PORT, () => {
  console.log(`Glance Archive Results Is Listening on Port ${PORT}`);
});
