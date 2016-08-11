'use strict';
angular.module('mobileMoneyApp')
  .controller('userLoginCtrl', ['$rootScope', '$scope', '$state','$http', 'authFactory', 'utilFactory',
	function ($rootScope, $scope, $state, $http, authFactory, utilFactory) {
  	   
       // variable to verify if the form has been submitted
      $scope.submitted = true;
      $scope.loginSuccessful = true;

      $scope.submitLoginForm = function(){
         // Check to make sure the form is valid
         if($scope.loginForm.$valid){
			 $rootScope.username = $scope.username;
			 $rootScope.password = $scope.password;
			 // show spinner
		     $scope.loading = true;
			 $scope.submitted = false;
			 authFactory.getAuthKey($scope.username, $scope.password)
			 	.then(function(response){
					var basicKey = response.data.base64EncodedAuthenticationKey;
					
					// set authorization header
					authFactory.setBasicAuthKey(basicKey);
					
					// initialize values for person carrying out transaction
					utilFactory.initTransactions("test staff", "office test")
						.then(function(response){
							$state.transitionTo('home');
						}, function(error){
							console.log("Error initialising staff");
						})
			 	}, function(error){
			 		 $scope.loginSuccessful = false;
					 $scope.submitted = true;
					 $scope.loading = false;
			 	});
           	 
         } else{
			 $scope.loading = false;
	 		 $scope.loginSuccessful = false;
			 $scope.submitted = true;
         }
      };
  }]);
