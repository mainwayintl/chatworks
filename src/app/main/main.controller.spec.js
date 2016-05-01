(function() {
    'use strict';

    describe('controllers', function() {
        var vm;
        var $timeout;
        var toastr;

        beforeEach(module('ngExercise'));
        beforeEach(inject(function(_$controller_, _$timeout_, _webDevTec_, _toastr_, _$log_) {
            spyOn(_webDevTec_, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
            spyOn(_toastr_, 'info').and.callThrough();
            spyOn(_$log_, 'debug').and.callThrough();

            vm = _$controller_('MainController');
            $timeout = _$timeout_;
            toastr = _toastr_;
        }));

        it('should have a timestamp creation date', function() {
            expect(vm.creationDate).toEqual(jasmine.any(Number));
        });

        it('should define sendMessage', function() {
            expect(vm.sendMessage).toBeDefined();
        });
    });
})();
