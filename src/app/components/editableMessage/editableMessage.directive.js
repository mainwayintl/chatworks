(function() {
  'use strict';

  angular
    .module('ngExercise')
    .directive('editableMessage', editableMessage);

  /** @ngInject */
  function editableMessage($log) {
    var directive = {
      require: 'ngModel',
      restrict: 'E',
      scope: {},
      template: '<p>{{message}}</p>' +
      '<button type="button" class="btn btn-default btn-xs" ng-click="cancel($event)">Cancel</button>' +
      '<button type="button" class="btn btn-default btn-xs" ng-click="save($event)">Save</button>',
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr, ngModelCtrl) {

      scope.mode = 'read';
      scope.newMessage = '';

      var textArea = el.find('p');

      el.addClass('editable-message');

      textArea.bind('click', toggleMode);

      function toggleMode(event){

        event.preventDefault();

        if(scope.mode === 'read'){
          // Editing mode
          scope.mode = 'edit';
          el.addClass('edit');
          textArea.attr('contentEditable', 'true');
          textArea.unbind('click');
          textArea.bind('keydown', keyDown);
        }else{
          // Read only mode
          scope.mode = 'read';
          el.removeClass('edit');
          textArea.removeAttr('contentEditable');
          textArea.bind('click', toggleMode);
          textArea.unbind('keydown');
        }

        $log.info('Current mode: ' + scope.mode);
      }

      function keyDown(event){
        var esc = event.which == 27;

        if (esc) {
          $log.info("esc");
          cancel(event);
        }
      }

      ngModelCtrl.$formatters.push(function(modelValue) {
        return {
          message: modelValue
        };
      });

      ngModelCtrl.$render = function() {
        scope.save    = save;
        scope.cancel  = cancel;
        scope.message = ngModelCtrl.$viewValue.message;
      };

      function save(event){
        ngModelCtrl.$setViewValue(textArea.text());
        toggleMode(event);
        $log.info('Save');
      }

      function cancel(event){
        textArea.text(ngModelCtrl.$viewValue.message);
        toggleMode(event);
        $log.info('Cancel');
      }

    }

  }

})();
