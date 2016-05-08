(function() {
  'use strict';

  describe('service authInterceptor', function() {
    var authInterceptor;
    var $httpBackend;
    var $log;

    beforeEach(module('ngExercise'));
    beforeEach(inject(function(_authInterceptor_, _$httpBackend_, _$log_) {
      authInterceptor = _authInterceptor_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function() {
      expect(authInterceptor).not.toEqual(null);
    });

  });
})();
