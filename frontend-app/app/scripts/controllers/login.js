'use strict';
angular.module('mobileMoneyApp')
  .controller('userLoginCtrl', ['$scope', '$state', function ($scope, $state, loginService) {
  	
    	$scope.navigateTo = function(view){
    		$state.transitionTo(view);
    	};

    	console.log($state.current.name);

    	$scope.checkLogin = function(){
    		return false;
    	};

    	$scope.checkLogin();
  }]);
