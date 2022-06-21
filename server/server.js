var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('i tried');
})
  
app.listen(3000);