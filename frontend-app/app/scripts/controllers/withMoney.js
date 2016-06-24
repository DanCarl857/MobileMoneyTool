'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('withMoneyCtrl', ['$scope', function ($scope) {

  		  $scope.submitted = true;
      	$scope.amount = 0;
      	$scope.date = new Date();

      	// function to handle requests to the mobile money engine
      	$scope.withMoneyRequest = function(){

      	}
  }]);
