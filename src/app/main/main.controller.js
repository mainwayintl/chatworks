(function() {
    'use strict';

    angular
        .module('ngExercise')
        .controller('MainController', MainController);
        // .directive('myEnter', function() {
        //     return function(scope, element, attrs) {
        //         element.bind("keydown keypress", function(event) {
        //             if (event.which === 13) {
        //                 scope.$apply(function() {
        //                     scope.$eval(attrs.myEnter);
        //                 });

        //                 event.preventDefault();
        //             }
        //         });
        //     };
        // });

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
            vm.messages.push({
                'userMessage': vm.userMessage
            });

            $log.debug('sendMessage');
            $log.debug(vm.userMessage);
        }

        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();

            angular.forEach(vm.awesomeThings, function(awesomeThing) {
                awesomeThing.rank = Math.random();
            });
        }
    }
})();
