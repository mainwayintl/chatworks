(function() {
  'use strict';

  angular
    .module('ngExercise')
    .factory('authInterceptor', authInterceptor);

    /** @ngInject */
    function authInterceptor($rootScope, $q, $window){
      var interceptor = {
        request: request,
        response: response
      }

      return interceptor;

      function request (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      }

      function response (response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }

    };

})();
