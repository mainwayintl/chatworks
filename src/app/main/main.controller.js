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
    function MainController($timeout, apiMessage, $log) {
        var vm = this;
        vm.messages = [];
        vm.userMessage = '';
        vm.sendMessage = sendMessage;

        activate();

        function activate() {
            getAllMessages();
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

    }
})();
