'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('saveMoneyCtrl', ['$scope', '$http', function ($scope, $http) {
  		// function to handle requests to the mobile money engine
      	$scope.saveMoney = function(){
	      	$scope.makeRequest();
      	};

        $scope.goBack = function(){
          window.history.back();
        };

      	$scope.makeRequest = function(){
      		var sReqUrl = "http://localhost:8090/api/v1/savings?phone=674377956&amount=5000&clientId=1234567";
      		$http({
      			method: "GET",
      			url: sReqUrl
      		})
      		.success(function(data){
      			$scope.data = data;
      			console.log("data: " + $scope.data);
      		})
      		.error(function(data){
      			console.log("Error with withdrawals " + data);
      		});
      	}
  }]);
