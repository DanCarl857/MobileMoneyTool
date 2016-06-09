angular.module('mobileMoneyApp')
  .controller('userLoginCtrl', function ($scope, $state) {
  	
    	$scope.navigateTo = function(view){
    		$state.transitionTo(view);
    	};

    	console.log($state.current.name);

    	$scope.checkLogin = function(){
    		return false;
    	}

    	$scope.checkLogin();
  });
