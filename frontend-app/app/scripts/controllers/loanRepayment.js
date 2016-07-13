'use strict';
/* global $ */

angular.module('mobileMoneyApp')
	.controller('loanCtrl', ['$scope', function($scope){

		$scope.submitted = true;
        var baseUrl = "http://localhost:8090/api/v1/loans";

        // function to submit the form after all form validation
        $scope.submitLoanForm = function(){
          // Check to make sure the form is completely valid
          console.log("testing loans");
          if($scope.loanForm.$valid){
            $scope.submitted = false;
            $scope.loanRepayment(12345678);
          }
        };
        
        $scope.amount = '';
        $scope.phoneNumber = '';

        $scope.goBack = function(){
        	window.history.back();
        }
	}]);