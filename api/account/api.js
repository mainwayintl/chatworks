var express     = require('express');
var jwt         = require('jsonwebtoken');
var appSettings = require('../config/appsettings');

module.exports = (function() {

  'use strict';

  var api = express.Router();

  api.post('/authenticate', function (req, res) {
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    if (!(req.body.username === 'chat.works' && req.body.password === 'pass')) {
      res.send(401, 'Wrong user or password');
      return;
    }

    var profile = {
      first_name: 'Chat',
      last_name: 'Works',
      email: 'Jack@Chat.Works',
      id: 123
    };

    // We are sending the profile inside the token
    var token = jwt.sign(profile, appSettings.secret, { expiresIn: '5h' });

    res.json({ token: token });
  });

  return api;

})();
