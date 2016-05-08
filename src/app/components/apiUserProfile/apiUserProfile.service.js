(function() {
  'use strict';

  angular
    .module('ngExercise')
    .factory('apiUserProfile', apiUserProfile);

    /** @ngInject */
    function apiUserProfile($log, $window, $http, appSettings, jwtHelper){
      var service = {
        authenticate: authenticate,
        isAuthenticated: isAuthenticated,
        firstName: firstName,
        lastName: lastName,
        userAccount: userAccount,
        logout: logout
      }

      return service;

      function authenticate(userName, password){

        var user = {username: userName, password: password};

        return $http.post(appSettings.apiHost + '/account/authenticate', user)
          .then(authenticateComplete)
          .catch(authenticateFailed);

        function authenticateComplete(response) {
          $window.sessionStorage.token = response.data.token;
          var userProfile = jwtHelper.decodeToken(response.data.token);
          $window.sessionStorage.userProfile = angular.toJson(userProfile);
          return true;
        };

        function authenticateFailed(error) {
          // Erase the token if the user fails to log in
          delete $window.sessionStorage.token;
          delete $window.sessionStorage.userProfile;
        };
      }

      function isAuthenticated(){
        // Check auth token's expiration
        if(!$window.sessionStorage.token){
          return false;
        }
        return !jwtHelper.isTokenExpired($window.sessionStorage.token);
      }

      function firstName(){
        if(isAuthenticated()){
          var userProfile = angular.fromJson($window.sessionStorage.userProfile);
          return userProfile.first_name;
        }
        return '';
      }

      function lastName(){
        if(isAuthenticated()){
          var userProfile = angular.fromJson($window.sessionStorage.userProfile);
          return userProfile.last_name;
        }
        return '';
      }

      function userAccount(){
        if(isAuthenticated()){
          var userProfile = angular.fromJson($window.sessionStorage.userProfile);
          return userProfile.email;
        }
        return '';
      }

      function logout(){
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.userProfile;
      }

    }

})();
