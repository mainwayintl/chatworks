(function() {
    'use strict';

    angular
        .module('ngExercise')
        .controller('MainController', MainController)
        .directive('myEnter', function() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.$apply(function() {
                            scope.$eval(attrs.myEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        });

    /** @ngInject */
    function MainController($log, $timeout, apiMessage, apiUserProfile) {
        var vm = this;
        vm.messages        = [];
        vm.userMessage     = '';
        vm.isAuthenticated = false;
        vm.userProfile     = '';
        vm.sendMessage     = sendMessage;
        vm.login           = login;
        vm.logout          = logout;

        activate();

        function activate() {
            if(apiUserProfile.isAuthenticated()){
              getAllMessages();
              vm.isAuthenticated = true;
              vm.userProfile = getUserProfileStr();
            }
        }

        function sendMessage() {
            var sentDateTime = formatDate(new Date());
            var newMessage = {
              'sentDateTime' : sentDateTime,
              'userMessage'  : vm.userMessage
            };
            vm.messages.push(newMessage);
            apiMessage.add(newMessage);
            $log.debug('sendMessage: ' + vm.userMessage);
        }

        function getAllMessages() {
            apiMessage.getAll().then(function(data){
              vm.messages = data;
            });
        }

        // Copied from here: http://stackoverflow.com/questions/25275696/javascript-format-date-time
        function formatDate(date) {
          var hours   = date.getHours();
          var minutes = date.getMinutes();
          var ampm    = hours >= 12 ? 'pm' : 'am';
          hours   = hours % 12;
          hours   = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
        }

        function login(){
          apiUserProfile.authenticate(vm.username, vm.password).then(function(success){
            vm.isAuthenticated = success;
            vm.userProfile = getUserProfileStr();
            getAllMessages();
          });
        }

        function logout(){
          apiUserProfile.logout();
          vm.isAuthenticated = false;
          vm.messages = [];
          vm.userProfile = '';
        }

        function getUserProfileStr(){
          return apiUserProfile.userAccount();
        }
    }
})();
