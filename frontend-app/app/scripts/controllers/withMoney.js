'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('withMoneyCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

        $scope.submitted = true;
        var baseUrl = "http://localhost:8090/api/v1/withdrawals";

        // function to submit the form after all form validation
        $scope.submitForm = function(){
          // Check to make sure the form is completely valid
          if($scope.withForm.$valid){
            $scope.submitted = false;
            $scope.withMoneyRequest(12345678);
          }
        };
        
        $scope.amount = '';
        $scope.phoneNumber = '';

      	// function to handle requests to the mobile money engine
      	$scope.withMoneyRequest = function(clientId){
	      	var requestUrl = baseUrl + "?phone=" + $scope.phoneNumber + "&amount=" + $scope.amount + "&clientId=" + clientId;
          console.log(requestUrl);
          $http({
            method: "GET",
            url: requestUrl
          }).success(function(data){
            $scope.data = data;
            console.log("data: " + $scope.data);
          }).error(function(data){
            console.log("Error with withdrawals: " + data);
          });
      	};

        // function to go back to source page
        $scope.goBack = function(){
          window.history.back();
        };
  }]);
