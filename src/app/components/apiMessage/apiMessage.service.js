(function() {
  'use strict';

  angular
    .module('ngExercise')
    .factory('apiMessage', apiMessage);

  /** @ngInject */
  function apiMessage($log, $http, appSettings) {

    var service = {
      getAll: getAll,
      add: add
    };

    return service;

    function getAll(limit) {
      if (!limit) {
        limit = 30;
      }

      return $http.get(appSettings.apiHost + '/api/message?per_page=' + limit)
        .then(getMessagesComplete)
        .catch(getMessagesFailed);

      function getMessagesComplete(response) {
        return response.data;
      }

      function getMessagesFailed(error) {
        $log.error('XHR Failed for getAll.\n' + angular.toJson(error.data, true));
      }
    }

    function add(newMessage){
      var data = angular.toJson(newMessage);
      $http.post(appSettings.apiHost + '/api/message', data);
    }
  }
})();
