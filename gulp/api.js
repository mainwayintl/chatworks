'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var gls  = require('gulp-live-server');

gulp.task('api', function () {

  // Start the server at the beginning of the task
  var server = gls.new(path.join(conf.paths.api, '/app.js'));
  server.start();

  // Restart backend when *.js files are updated
  gulp.watch(path.join(conf.paths.api, '/**/*.js'), function() {
    server.start.bind(server)()
  });

});
