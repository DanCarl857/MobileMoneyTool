angular.module('mobileMoneyApp')
  .controller('userLoginCtrl', '$scope', '$state', 'loginService', function ($scope, $state, loginService) {
  	
    	$scope.navigateTo = function(view){
    		$state.transitionTo(view);
    	};

    	console.log($state.current.name);

    	$scope.checkLogin = function(){
    		return false;
    	}

    	$scope.checkLogin();

      loginService.loginUser("mifos", "password").then(
        function(response){
          console.log(response);
        },
        function(err){
          console.log(err);
        }
      )
  });
