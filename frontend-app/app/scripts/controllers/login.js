'use strict';
angular.module('mobileMoneyApp')
  .controller('userLoginCtrl', ['$scope', '$state', function ($scope, $state, loginService) {
  	   
       // variable to verify if the form has been submitted
      $scope.submitted = true;
      $scope.loginSuccessful = true;

    	$scope.navigateTo = function(view){
    		$state.transitionTo(view);
    	};

      // function to send name of staff member and office to api
        $scope.makeRequest = function(){
          var wReqUrl = 'http://localhost:8090/api/v1/create?staff="Marcus Brody"&office="Head Office"';
          $http({
            method: "GET",
            url: wReqUrl
          })
          .success(function(data){
            $scope.data = data;
            console.log("data: " + $scope.data);
          })
          .error(function(data){
            console.log("Error with initial creation" + data);
          });
        };

    	console.log($state.current.name);

    	$scope.checkLogin = function(){
    		return false;
    	};

    	$scope.checkLogin();
  }]);
