'use strict';

angular.module('mobileMoneyApp')
  .controller('clientCtrl', ['$scope', function ($scope) {
    $scope.goBack = function(){
    	window.history.back();
    };
  }]);
