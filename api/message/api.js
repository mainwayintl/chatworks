var express = require('express');

module.exports = (function() {

  'use strict';

  var api = express.Router();

  var messages = [
    {
      sentDateTime: 'Beginning of time',
      userMessage: 'Welcome.'
    }
  ];

  api.get('/', function (req, res) {
    res.send(messages);
    console.info('GET: ');
  });

  api.post('/', function (req, res) {
    console.info('req.body:' + req.body);
    var newMessage = req.body;
    messages.push(newMessage);
    res.send({index: messages.length - 1});
    console.info('POST: ');
  });

  api.delete('/', function (req, res) {
    res.send('removing ...');
    console.info('DEL: ');
  });

  api.put('/', function (req, res) {
    res.send('updating ...');
    console.info('PUT: ');
  });

  return api;

})();
