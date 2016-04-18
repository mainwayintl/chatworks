(function() {
  'use strict';

  angular
    .module('ngExercise')
    .directive('editableMessage', editableMessage);

  /** @ngInject */
  function editableMessage($log) {
    var directive = {
      restrict: 'E',
      scope: {
        message: '=',
      },
      template: '<p>{{vm.message}}</p>' +
      '<button type="button" class="btn btn-default btn-xs">Cancel</button>' +
      '<button type="button" class="btn btn-default btn-xs">Save</button>',
      link: linkFunc,
      controller: EditableMessageController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {

      scope.mode = 'read';

      el.addClass('editable-message');

      function toggleMode(){
        if(scope.mode === 'read'){
          scope.mode = 'edit';
          el.addClass('edit');
          el.find('p').attr('contentEditable', 'true');
          el.unbind('click');
        }else{
          scope.mode = 'read';
          el.removeClass('edit');
          el.find('p').removeAttribute('contentEditable');
          el.bind('click', toggleMode);
        }
        $log.info('Current mode: ' + scope.mode);
      };

      el.bind('click', toggleMode);
    }

    /** @ngInject */
    function EditableMessageController($log) {
      var vm = this;
      vm.clicked = clicked;

      activate();

      function activate() {
        $log.info('Activated editable message view');
      }

      function clicked($event){
      }
    }

  }

})();
