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
    function MainController($timeout, webDevTec, toastr, $log) {
        var vm = this;

        vm.awesomeThings = [];
        vm.messages = [];
        vm.userMessage = [];
        vm.classAnimation = '';
        vm.creationDate = 1460473480976;
        vm.showToastr = showToastr;
        vm.sendMessage = sendMessage;

        activate();

        function activate() {
            getWebDevTec();
            $timeout(function() {
                vm.classAnimation = 'rubberBand';
            }, 4000);
        }

        function showToastr() {
            toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
            vm.classAnimation = '';
        }

        function sendMessage() {
            var sentDateTime = formatDate(new Date());
            vm.messages.push({
              'sentDateTime' : sentDateTime,
              'userMessage'  : vm.userMessage
            });

            $log.debug('sendMessage: ' + vm.userMessage);
        }

        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();

            angular.forEach(vm.awesomeThings, function(awesomeThing) {
                awesomeThing.rank = Math.random();
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
