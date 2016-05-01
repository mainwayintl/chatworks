var express = require('express');
var bodyParser = require('body-parser')

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var messages = [
  {
    sentDateTime: 'Beginning of time',
    userMessage: 'Welcome.'
  }
];

app.get('/message', function (req, res) {
  res.send(messages);
  console.info('get request');
});

app.post('/message', function (req, res) {
  console.info('req.body:' + req.body);
  var newMessage = req.body;
  messages.push(newMessage);
  res.send({index: messages.length - 1});
  console.info('post request');
});

app.delete('/message', function (req, res) {
  res.send('removing ...');
  console.info('remove request');
});

app.put('/message', function (req, res) {
  res.send('updating ...');
  console.info('update request');
});

app.listen(8080, function () {
  console.info('Chatworks API listening on port 8080!');
});
