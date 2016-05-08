(function() {
  'use strict';

  describe('service apiMessage', function() {
    var apiMessage;
    var $httpBackend;
    var $log;

    beforeEach(module('ngExercise'));
    beforeEach(inject(function(_apiMessage_, _$httpBackend_, _$log_) {
      apiMessage = _apiMessage_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function() {
      expect(apiMessage).not.toEqual(null);
    });

    describe('getAll function', function() {
      it('should exist', function() {
        expect(apiMessage.getAll).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend.when('GET',  apiMessage.apiHost + '/message?per_page=1').respond(200, [{userMessage: 'Hello.'}]);
        var data;
        apiMessage.getAll(1).then(function(fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 1).toBeTruthy();
        expect(data[0]).toEqual(jasmine.any(Object));
      });

    });
  });
})();
