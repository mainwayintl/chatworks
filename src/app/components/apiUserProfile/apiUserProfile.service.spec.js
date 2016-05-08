(function() {
  'use strict';

  describe('service apiUserProfile', function() {
    var apiUserProfile;
    var $httpBackend;
    var $log;

    beforeEach(module('ngExercise'));
    beforeEach(inject(function(_apiUserProfile_, _$httpBackend_, _$log_) {
      apiUserProfile = _apiUserProfile_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function() {
      expect(apiUserProfile).not.toEqual(null);
    });

  });
})();
