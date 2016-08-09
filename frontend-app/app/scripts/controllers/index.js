'use strict';

angular.module('mobileMoneyApp')
  .run(function($rootScope, $location){
    $rootScope.location = $location;
  });
