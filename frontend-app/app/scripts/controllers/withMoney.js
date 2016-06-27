'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('withMoneyCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  		$scope.submitted = true;
      	$scope.date = new Date();

      	// function to handle requests to the mobile money engine
      	$scope.withMoneyRequest = function(clientId){
	      	$scope.makeRequest();
      	};

      	// function to make a check
      	$scope.check = function(){
      		if($scope.amount === undefined){
      			return true;
      		}
      	}

      	// function to actually make request
      	$scope.makeRequest = function(){
      		var wReqUrl = "http://localhost:8090/api/v1/withdrawals?phone=674377956&amount=5000&clientId=1234567";
      		$http({
      			method: "GET",
      			url: wReqUrl
      		})
      		.success(function(data){
      			$scope.data = data;
      			console.log("data: " + $scope.data);
      		})
      		.error(function(data){
      			console.log("Error with withdrawals" + data);
      		});
      	};
  }]);
