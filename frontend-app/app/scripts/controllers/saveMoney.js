'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('saveMoneyCtrl', ['$scope', '$http', function ($scope, $http) {
  		
      $scope.submitted = true;
      var baseUrl = "http://localhost:8090/api/v1/savings";

      // function to submit form
      $scope.submitSaveForm = function(){
        console.log("1");
        if($scope.saveForm.$valid){
          console.log("2");
          $scope.submitted = false;
          $scope.saveMoneyRequest(1234567);
        }
      };

      $scope.amount = '';
      $scope.phoneNumber = '';

      // function to handle requests to the mobile money engine
      	$scope.saveMoneyRequest = function(clientId){
          $scope.accountId = "4904123";
	      	var srequestUrl = baseUrl + "?phone="+ $scope.phoneNumber + "&amount=" + $scope.amount + "&clientId="+ clientId + "&accountId=" + $scope.accountId;
          console.log(srequestUrl);
          $http({
            method: "GET",
            url: srequestUrl
          }).success(function(data){
            $scope.data = data;
            console.log("data: " + $scope.data);
          }).error(function(data){
            console.log("Error with saving money: "+ data);
          })
      	};

        $scope.goBack = function(){
          window.history.back();
        };
  }]);
