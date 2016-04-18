(function() {
  'use strict';

  angular
    .module('ngExercise')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
