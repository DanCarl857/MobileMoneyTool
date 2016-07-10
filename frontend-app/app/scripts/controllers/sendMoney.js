'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('sendMoneyCtrl', ['$scope', '$http', function ($scope, $http) {
  		  
        $scope.submitted = true;
        var baseUrl = "http://localhost:8090/api/v1/send";

        // function to submit the form
        $scope.submitSendForm = function(){
          if($scope.sendForm.$valid){
            $scope.submitted = false;
            $scope.sendMoneyRequest(12345678);
          }
        };

        $scope.amount = '';
        $scope.phone = '';
        $scope.rec_name = '';
        $scope.rec_phone = '';

        $scope.sendMoneyRequest = function(clientId){
          var sendRequestUrl = baseUrl + "?phone=" + $scope.phone + "&amount=" + $scope.amount + "&recipient=" + $scope.rec_name + "&clientId=" + clientId;
          console.log(sendRequestUrl);
          $http({
            method: "GET",
            url: sendRequestUrl
          }).success(function(data){
            $scope.data = data;
            console.log("data: "+ $scope.data);
          }).error(function(data){
            console.log("Error with sending money: "+ data);
          })
        };

        $scope.goBack = function(){
          window.history.back();
        };
  }]);
