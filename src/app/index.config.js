(function() {
  'use strict';

  angular
    .module('ngExercise')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Add auth token for each request
    $httpProvider.interceptors.push('authInterceptor');

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
