'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('sendMoneyCtrl', ['$scope', '$http', function ($scope, $http) {
  		$scope.submitted = true;

  		// function to handle requests to the mobile money engine
      	$scope.sendMoneyRequest = function(clientId){
	      	$scope.makeRequest();
      	};

        $scope.goBack = function(){
          window.history.back();
        };

      	// function to actually make request
      	$scope.makeRequest = function(){
      		var wReqUrl = "http://localhost:9876/api/v1/send?phone=674377956&amount=5000&recipient=%22Joe%22&clientId=1234567";
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
