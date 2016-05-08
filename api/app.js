var express     = require('express');
var bodyParser  = require('body-parser')
var expressJwt  = require('express-jwt');
var appSettings = require('./config/appsettings');

var app    = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: appSettings.secret}));

var apiMessage = require('./message/api');
app.use('/api/message', apiMessage);

var apiAuthentication = require('./account/api');
app.use('/account', apiAuthentication);

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.info('Chatworks API listening on port ' + port + '!');
});
