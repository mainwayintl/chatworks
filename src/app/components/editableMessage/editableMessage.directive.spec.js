(function() {
  'use strict';

  /**
   * @todo Complete the test
   * This example is not perfect.
   * The `link` function is not tested.
   * (malarkey usage, addClass, $watch, $destroy)
   */
  describe('directive editableMessage', function() {
    var $log;
    var vm;
    var el;
    var message = 'Hello world!';

    beforeEach(module('ngExercise'));
    beforeEach(inject(function($compile, $rootScope, _$log_) {
      $log = _$log_;

      el = angular.element('<editable-message message="\'' + message + '\']"></editable-message>');

      $compile(el)($rootScope.$new());
      $rootScope.$digest();
      vm = el.isolateScope().vm;
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    it('should have isolate scope object with instanciate members', function() {
      expect(vm).toEqual(jasmine.any(Object));

      expect(vm.message).toEqual(jasmine.any(String));
    });

  });
})();
