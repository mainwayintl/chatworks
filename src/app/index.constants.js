/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('ngExercise')
    .constant('appSettings', {
      apiHost: 'http://localhost:3000/local-dev'
    })
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
