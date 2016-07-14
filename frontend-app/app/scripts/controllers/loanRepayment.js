'use strict';
/* global $ */

angular.module('mobileMoneyApp')
	.controller('loanCtrl', ['$scope', function($scope){

		// function to go back to source page
        $scope.goBack = function(){
          window.history.back();
        };
	}]);